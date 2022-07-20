import { ref, defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const count = ref(0);
    const add = () => {
      count.value++;
    }
    return { count, add };
  },
  render() {
    return <div>
      <button onClick={this.add}>增加</button>
      {this.count}
    </div>
  }
})