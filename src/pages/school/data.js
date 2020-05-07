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
        ],
        school_organ: [
            { required: true, message: '请输入机构代码', trigger: 'blur' }
        ],
        school_type: [
            { required: true, message: '请选择学校类型', trigger: 'blur' }   
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
    rlueGrade: {
        school_id: [
            { required: true, message: '请选择所属学校', trigger: 'blur' }
        ],
        grade_type: [
            { required: true, message: '请选择请选择年级类型', trigger: 'blur' }
        ],
        grade_number: [
            { required: true, message: '请选择班年级', trigger: 'blur' }
        ]
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
    gradeType:[
        {
            value:0,
            name:'小学'
        },
        {
            value:1,
            name:'初中'
        },
        {
            value:2,
            name:'小学'
        },{
            value:3,
            name:'小学'
        }
    ],
    grades:[
        [{
            value:0,
            name:'学前班'
        },
        {
            value:1,
            name:'一年级'
        },
        {
            value:2,
            name:'二年级'
        },
        {
            value:3,
            name:'三年级'
        },
        {
            value:4,
            name:'四年级'
        },
        {
            value:5,
            name:'五年级'
        },{
            value:6,
            name:'六年级'
        }],
        [{
            value:1,
            name:'初一'
        },
        {
            value:2,
            name:'初二'
        },
        {
            value:3,
            name:'初三'
        }
        
        ],
        [
            {
                value:1,
                name:'高一'
            },
            {
                value:2,
                name:'高二'
            },
            {
                value:3,
                name:'高三'
            }
        ],
        [{
            value:1,
            name:'大一'
        },
        {
            value:2,
            name:'大二'
        },
        {
            value:3,
            name:'大三'
        },
        {
            value:4,
            name:'大四'
        },
        {
            value:5,
            name:'大五'
        }
        ]
    ]


}