import { defineComponent } from 'vue'

export default defineComponent(() => {
  const handleClick = () => {
    console.log('handleClick')
  }
  const fn = () => (
    <div>
      123
      <div onClick={handleClick}>asdadad</div>
    </div>
  )
  return fn
})
