const admins = {
    template: `
        <div>
            <button type="button"
                    class="btn btn-primary m-2 fload-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    @click="addClick()">
                Add Admin
            </button>

            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Contact Details</th>
                        <th>Username</th>
                        <th>Last Login</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="adm in admins">
                        <td>{{ adm.name }}</td>
                        <td>{{ adm.role }}</td>
                        <td>{{ adm.contactDetails }}</td>
                        <td>{{ adm.username }}</td>
                        <td>{{ adm.lastLogin }}</td>
                        <td>
                            <button type="button"
                                    class="btn btn-light mr-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    @click="editClick(adm)">
                                Edit
                            </button>
                            <button type="button"
                                    @click="deleteClick(adm.id)"
                                    class="btn btn-light mr-1">
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="modal fade" id="exampleModal" tabindex="-1"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">{{ modalTitle }}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="input-group mb-3">
                                <span class="input-group-text">Name</span>
                                <input type="text" class="form-control" v-model="name">
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Role</span>
                                <input type="text" class="form-control" v-model="role">
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Contact Details</span>
                                <input type="text" class="form-control" v-model="contactDetails">
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Username</span>
                                <input type="text" class="form-control" v-model="username">
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Last Login</span>
                                <input type="date" class="form-control" v-model="lastLogin">
                            </div>
                            <button type="button" @click="createOrUpdateClick()"
                                    v-if="adminId === 0" class="btn btn-primary">
                                Create
                            </button>
                            <button type="button" @click="createOrUpdateClick()"
                                    v-if="adminId !== 0" class="btn btn-primary">
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            admins: [],
            modalTitle: "",
            name: "",
            role: "",
            contactDetails: "",
            username: "",
            hashedPassword: "",
            lastLogin: "",
            adminId: 0
        }
    },
    methods: {
        refreshData() {
            axios.get(variables.API_URL + "admins")
                .then(response => {
                    this.admins = response.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        addClick() {
            this.modalTitle = "Add Admin";
            this.adminId = 0;
            this.name = "";
            this.role = "";
            this.contactDetails = "";
            this.username = "";
            this.hashedPassword = "";
            this.lastLogin = "";
        },
        editClick(adm) {
            this.modalTitle = "Edit Admin";
            this.adminId = adm.id;
            this.name = adm.name;
            this.role = adm.role;
            this.contactDetails = adm.contactDetails;
            this.username = adm.username;
            this.hashedPassword = adm.hashedPassword;
            this.lastLogin = adm.lastLogin;
        },
        createOrUpdateClick() {
            if (this.adminId === 0) {
                axios.post(variables.API_URL + "admins", {
                        name: this.name,
                        role: this.role,
                        contactDetails: this.contactDetails,
                        username: this.username,
                        hashedPassword: this.hashedPassword,
                        lastLogin: this.lastLogin
                    })
                    .then(response => {
                        this.refreshData();
                        alert(response.data);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            } else {
                axios.put(variables.API_URL + "admins/" + this.adminId, {
                        name: this.name,
                        role: this.role,
                        contactDetails: this.contactDetails,
                        username: this.username,
                        hashedPassword: this.hashedPassword,
                        lastLogin: this.lastLogin
                    })
                    .then(response => {
                        this.refreshData();
                        alert(response.data);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
            this.clearForm();
        },
        deleteClick(id) {
            if (!confirm("Are you sure you want to delete this admin?")) {
                return;
            }
            axios.delete(variables.API_URL + "admins/" + id)
                .then(response => {
                    this.refreshData();
                    alert(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        },
        clearForm() {
            this.adminId = 0;
            this.name = "";
            this.role = "";
            this.contactDetails = "";
            this.username = "";
            this.hashedPassword = "";
            this.lastLogin = "";
        }
    },
    mounted() {
        this.refreshData();
    }
};
