//  元组
const tuple: [string, string, number] = ['a', 'x', 1]
// console.log(tuple)

// 枚举类型
const enum ROLE { // 加上const后 不会生成一个对象
    USER = 'a',
    ADMIN = 4,
    MAN
}
// console.log(ROLE.USER)
// 枚举支持反举， 但是限于索引


// null undefined
let name: undefined = undefined
let n: null = null
// console.log(name, n)


// never 从不 代码无法达到终点， 无法执行到结尾
// 出错， 四循环
function nv(): never {
    while (true) { }
}
// console.log('nv', nv);

// void object
function getViod(): void {
    return undefined
}
// console.log('ger', getViod);

// 联合类型  不给复制就是 any

let numOrStr: string | number
numOrStr = 100
numOrStr = 'xxx'

const ele: HTMLElement | null = document.getElementById('app')
// 非空断言 表示这个东西一定有值 告诉ts按照我的想法来
ele!.innerHTML = 'abc'

// 直接强制转化某个类型
let a: string | number | undefined
a = 'asdasd';
(<string>a).indexOf('a')

// 字面量类型
type Itype = 'a' | "b" | 'c' | 'd'

let type1: Itype = 'b'


// 函数， 对函数增加类型
function sum(x: string, y: string): string {
    return x + y
}
sum('a', 'b')

// @eat
// class Person {

// }


interface Iperson {
    name: string
    age: number
}

let person: Iperson = {
    name: "aaa",
    age: 12
}

//元组的类型交换

const swap = <T, K>(arr: [T, K]): [K, T] => {
    return [arr[1], arr[0]]
}

swap(['abc', 123])

interface ISpeaker {
    name: string
    speak(): void
}

interface IEat {
    eat(): number
}
let mycool: ISpeaker = {
    name: "",
    speak: function (): void {
        throw new Error("Function not implemented.")
    }
}
class Speak implements ISpeaker, IEat {
    name: 'www'
    speak(): string {
        return 'xx'
    }
    eat(): number {
        return 123
    }
}

interface IArr<T> {
    [k: number]: T
}
interface ICreateArr {
    <T>(x: number, k: T): IArr<T>
}
// type ICreateArr = <T>(s: number, k: T) => T[]
const createArray: ICreateArr = <T>(times: number, value: T): T[] => {
    let arr = []
    for (let i = 0; i < times; i++) {
        arr.push(value)
    }
    return arr
}

createArray(3, 'abc')

// 泛型给类的使用
class GetArrMax<T = number> {
    public arr: T[] = []
    add(val: T) {
        this.arr.push(val)
    }
    getMax() {
        let arr = this.arr
        let max = arr[0]
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[i]
            }
        }
        return max
    }
}

let getArr = new GetArrMax<number>()
getArr.add(1)
getArr.add(2)
getArr.add(3)
getArr.add(4)
const r = getArr.getMax()


// 1. typeof 区分类型，保护变量
function fn(val: number | string) {
    if (typeof val == 'number') {
        val.toFixed()
    } else {
        val.concat()
    }
}

// 2. instanceof  in


// 交叉类型， 交集
interface Person1 {
    handSome: string
}

interface Person2 {
    height: string
}

type Person3 = Person1 & Person2
let Iperson: Person3 = {
    handSome: 'xxx',
    height: 'xxx'
}

// 方法的mixin默认生成交集
function mixin<T extends object, K extends object>(o1: T, o2: K): T & K {
    return { ...o1, ...o2 }
}
let r1 = mixin({ name: 'xxx', age: 12 }, { address: 'zzz' })
// r1.age

// ts 中的兼容性


// ts 中的条件类型
interface Fish {
    name: string
    type: 'yu'
}

interface Bird {
    name: string
    type: 'niao'
}

interface Swimming {
    swimming: string
}
interface Sky {
    sky: string
}

type MyType<T> = T extends Bird ? Sky : Swimming // 三元表达式功能

// type Exclude<T, K> = T extends K ? never : T;
type MyS = Exclude<string | number | boolean, boolean>


// type Extract<T, K> = T extends K ? T : never;
type sMySt = Extract<string | number | boolean, boolean>
type MySt = Extract<string | number | boolean, boolean>

// infet 推断  
// 获取函数的返回值类型， infer 放在哪里就是推断哪里的类型
function getType(x: number, y: string) {
    return { name: 'xxx', age: 12 }
}

// type ReturnType<T extends (...args: any) => any> = T extends (...args: any[]) => infer r ? r : any
type oget = ReturnType<typeof getType>

// type Parameters<T extends (...args: any[]) => any> = T extends (...args: infer P) => any ? P : any
type osget = Parameters<typeof getType>


class Person {
    constructor({ name: string }) { }
}
type ConstructorParameters<T extends new (...args: any[]) => any> = T extends new (...args: infer CP) => any ? CP : any
type myC = ConstructorParameters<typeof Person>


// T extends xxx? 三元。类型分发， infer 关键字

interface ICompany {
    name: string
    address: string
}
interface IPerson {
    name: string
    age: number
    company: ICompany
}
// Partial  深度递归
type Partial<T> = {
    [K in keyof T]?: T[K] extends object ? Partial<T[K]> : T[K]
}
type MyPerson = Partial<IPerson>
let p: MyPerson = {
}

const t: Partial<IPerson> = {
    name: 'xxx',
    age: 11,
    company: {
        name: 'xxx',
    }
}

type Ipse<T> = {
    [k in keyof T]?: T[k] extends object ? Ipse<T[k]> : T[k]
}

const tt: Ipse<IPerson> = {
    name: 'xxx',
    age: 11,
    company: {
        name: 'xxx',
    }
}

// required
type Required<T> = {
    [k in keyof T]-?: T[k]
}
type MyRe = Required<MyPerson>

type ba = {
    [k in keyof ICompany]?: string
}
type baa = {
    [k in keyof ba]-?: string
}
const y: ba = {

}
// Readonly 
type Readonly<T> = {
    readonly [k in keyof T]-?: T[k]
}
type MyRead = Readonly<MyPerson>

// pick 精挑细选
// type Pick<T, K extends keyof T> = {
//     [X in K]: T[X]
// }
type Mypick = Pick<IPerson, 'age' | 'company'>

// omit 忽略属性
// type Omit<T, K extends any> = { [P in Exclude<keyof T, K>]: T[P] }
type MyOmit = Omit<IPerson, 'name'> & { name: number }

interface O {
    name: string
    age: number
    height: number
}
type MO = Exclude<keyof O, 'name'>

// Record 类型
// let obj: Record<string | number, any> = { a: 1, 2: 2 }
type Record<K extends keyof any, T> = {
    [p in K]: T
}
function map<K extends keyof any, V, X>(obj: Record<K, V>, cb: (item: V, key: K) => X): Record<K, X> {
    let result = {} as Record<K, X>
    for (let key in obj) {
        result[key] = cb(obj[key], key)
    }
    return result
}
let rs = map({ name: 'xx', age: 12 }, (item, key) => {
    return "$" + item + key
})


let length: any = "5";
let numberLength: number = <number>length; // Using <type> syntax
let stringLength: number = length as number;



function identity<T>(arg: T): T {
    return arg;
}
const result1 = identity<number>(42); // Explicitly specifying the type
const result2 = identity('hello');


interface Person {
    name: string;
    age: number;
}
type PersonKeys = keyof Person; // "name" | "age"
const Per: PersonKeys = 'name'

interface Person {
    name: string;
    age: number;
}




type _P = number | string | boolean

interface Ip {
    name: string,
    age: number
}

type s = Exclude<Ip, string>
const tts: s = {
    name: 'xxx',
    age: 10
}
interface Person {
    name: string;
    age: number;
    city: boolean;
}

// <T, K> = T extends K ? never : T

type Px<T, K> = T extends K ? never : T
type L = Px<string | number, string>

type _O<T, X extends keyof T> = {
    [K in Px<keyof T, X>]: T[K]
}
type PersonWithoutCity = _O<Person, 'city'>;
const john: PersonWithoutCity = { name: 'John', age: 30 };


type sz<T, K> = T extends K ? never : T

type _OO<T, K extends keyof T> = {
    // [X in Exclude<keyof T, K>]: T[X]
    [X in sz<keyof T, K>]: T[X]
}

// type cc<T> = T extends Person
// const zc: cc = {}

type PersonWithoutCitys = _OO<Person, 'city'>;

type A1 = 'x' extends 'xX' ? string : number; // string

type A2 = 'x' | 'y' extends 'x' ? string : number; // number

type P<T> = T extends 'x' ? string : number;
type A3 = P<'x' | 'y'> // ?

type kk = keyof Person
const zk: kk = 'name'


interface PubObj {
    name: string,
    age: number
}

type MyObj<T> = {
    readonly [K in keyof T]?: T[K]
}
const obj: MyObj<PubObj> = {
    name: 'xxx',
}
// obj.name = 'yyy'


interface PersonT {
    name: string;
    age: number;
    show: boolean;
  }
  type MappedConditional<T> = {
    [K in keyof T]: T[K] extends number ? string: T[K]
  };
  const johns: MappedConditional<PersonT> = { name: 'John', age: '30', show: true };
  console.log('x', johns);




  type CheckKey<T, K extends keyof T> = K extends 'name' ? true : false;
  interface Person {
    name: string;
    age: number;
  }
  type IsNameKey = CheckKey<Person, 'name'>; // Result: true
  type IsCityKey = CheckKey<Person, 'city'>; // Result: false












// 链式调用
// type FChain = () => any
// function chain<FChain>(x: number): any {
//     const target = {
//         value: x,
//     }
//     chain.add = (): any => {
//         target.value = target.value + 1
//         return proxy
//     }
//     chain.end = () => {
//         return target.value
//     }
//     chain.inc = () => {
//         target.value = target.value - 1
//         return proxy
//     }
//     const proxy = new Proxy(target, {
//         get(a, b) {
//             return chain[b](x)
//         }
//     })
//     return proxy
// }

// console.log('--------->', chain(3).add.end);
// console.log('--------->', chain(3).inc.end);

export { }