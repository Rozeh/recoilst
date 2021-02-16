import { atom, RecoilRoot, useRecoilState } from "recoil";
import TodoList from "../todos/TodoList";

const countState = atom({
  key: 'countState',
  default: 0,
})
function App() {
  return (
    <RecoilRoot>
      <TodoList />
    </RecoilRoot>
  )
}
export default App;
