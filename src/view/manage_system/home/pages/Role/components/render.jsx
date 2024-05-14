import { ElButton, ElInput } from 'element-plus'
import { computed, defineComponent, ref } from 'vue'
const datas = [1, 2, 3, 4, 5]
export default defineComponent({
  props: ['info'],
  setup(props, options) {
    const data = ref(1000)

    const inputValue = ref(1000)
    // const s = computed({
    //   get: () => {
    //     return 100
    //   }
    // })
    const str = 'xxxxxxxxxxxxxxxx'
    const handleClick = () => {
      data.value++
    }

    console.log(props.info, options)
    function handleInputChange(event) {
      console.log(event)
      inputValue.value = event.target?.value
    }
    return () => {
      return (
        <div>
          <div>
            {str} -- {data.value}
          </div>
          <button onClick={handleClick}>点击我</button>
          <div>
            {datas.map((item) => (
              <div>{item}</div>
            ))}
          </div>
          <ElButton type="primary" onClick={handleClick}>
            点击我
          </ElButton>
          <ElButton type="warning" onClick={() => data.value--}>
            Warning
          </ElButton>
          <ElButton type="danger" onClick={() => (data.value += 2)}>
            Danger
          </ElButton>
          <input
            value={inputValue.value}
            onChange={handleInputChange}
            placeholder="Please"
            clearable
          />
          <ElInput v-model={inputValue.value} placeholder="Please" clearable />
        </div>
      )
    }
  }
})
