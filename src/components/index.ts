import { ElButton, ElContainer, ElHeader, ElAside, ElMain } from 'element-plus'
import 'element-plus/dist/index.css'
export default function (app:any):void {
    app.use(ElButton)
        .use(ElContainer)
        .use(ElHeader)
        .use(ElAside)
        .use(ElMain)
}