export default {
    school(res) {
        let i = 2;
        let arr = []
        console.log(res['A2'])
        while (res['A'+i]){
            let obj = {
                school_name: res['A'+i].v,
                school_organ: res['B'+i].v,
                school_type: res['C'+i].v,
                admin_id: res['D'+i].v,
                gps_latitude_longitude: res['E'+i].v,
                principal_admin_id: res['F'+i].v
            }
            arr.push(obj);
            i++
        }
        console.log(arr)
        return arr;
    },
    teacher(res) {
        let i = 2;
        let arr = [];
        console.log(res['A2'])
        while (res['A'+i]) {
            let obj = {
                school_id: res['A'+i].v,
                admin_name: res['B'+i].v,
                login_name: res['C'+i].v,
                login_pass: res['D'+i].v,
                admin_tel: res['E'+i].v
            }
            arr.push(obj);
            i++
        }
        return arr;
    },
    guard(res) {
        let i = 2;
        let arr = [];
        console.log(res['A2'])
        while (res['A'+i]) {
            let obj = {
                school_id: res['A'+i].v,
                guard_name: res['B'+i].v,
                guard_tel: res['C'+i].v
            }
            arr.push(obj);
            i++
        }
        return arr;
    },
    schoolClass(res) {
        let i = 2;
        let arr = [];
        console.log(res['A2'])
        while (res['A'+i]) {
            let obj = {
                // school_id: res['A'+i].v,
                // grade_type: res['B'+i].v,
                // grade_name: res['C'+i].v,
                // grade_number: res['D'+i].v,

            }
            arr.push(obj);
            i++
        }
        return arr;
    }

}