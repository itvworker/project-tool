export default {
    rules: {
        school_name: [
            { required: true, message: '请输入学校名称', trigger: 'blur' }
        ],
        school_address: [
            { required: true, message: '请输入学校地址', trigger: 'blur' }
        ],
        gps_latitude_longitude: [
            { required: true, message: '请输入经纬度', trigger: 'blur' }
        ]
    },
    student: {
        school_student: [
            { required: true, message: '请输入学生姓名', trigger: 'blur' }
        ],
        school_name: [
            { required: true, message: '请选择学校', trigger: 'blur' }
        ],
        school_calss: [
            { required: true, message: '请选择班', trigger: 'blur' }
        ],
        parent_tel: [
            { required: true, message: '例如：13x123456789,13x123456789', trigger: 'blur' }
        ],
        student_card: [
            { required: true, message: '请输入学生学号', trigger: 'blur' }
        ],
    },
    list: [
        {
            id:'213143432423',
            school_name: '学校名称',
            school_address: '乐从大道',
            number: 10,
            cards: 10,
            gps_latitude_longitude: '22.794611,113.29524'
        }
    ],


}