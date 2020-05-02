export default {
    rules: {
        name: [
            { required: true, message: '请输入学校名称', trigger: 'blur' }
        ],
        address: [
            { required: true, message: '请输入学校地址', trigger: 'blur' }
        ],
        latlng: [
            { required: true, message: '请输入经纬度', trigger: 'blur' }
        ]
    },
    list: [
        {
            id:'213143432423',
            name: '学校名称',
            address: '乐从大道',
            number: 10,
            cards: 10,
            lng:12.48787,
            lat: 116.15445454

        }

    ]

}