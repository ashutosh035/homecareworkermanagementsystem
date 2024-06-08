const messages = {
    template: `
        <div>
            <button type="button"
                    class="btn btn-primary m-2 fload-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    @click="addClick()">
                Add Message
            </button>

            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Message Content</th>
                        <th>Message Status</th>
                        <th>Admin</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="msg in messages">
                        <td>{{ msg.messageContent }}</td>
                        <td>{{ msg.messageStatus }}</td>
                        <td>{{ msg.admin }}</td>
                        <td>
                            <button type="button"
                                    class="btn btn-light mr-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    @click="editClick(msg)">
                                Edit
                            </button>
                            <button type="button"
                                    @click="deleteClick(msg.id)"
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
                                <span class="input-group-text">Message Content</span>
                                <input type="text" class="form-control" v-model="messageContent">
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Message Status</span>
                                <input type="text" class="form-control" v-model="messageStatus">
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Admin</span>
                                <input type="text" class="form-control" v-model="admin">
                            </div>
                            <button type="button" @click="createOrUpdateClick()"
                                    v-if="messageId === 0" class="btn btn-primary">
                                Create
                            </button>
                            <button type="button" @click="createOrUpdateClick()"
                                    v-if="messageId !== 0" class="btn btn-primary">
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
            messages: [],
            modalTitle: "",
            messageContent: "",
            messageStatus: "",
            admin: "",
            messageId: 0
        }
    },
    methods: {
        refreshData() {
            axios.get(variables.API_URL + "messages")
                .then(response => {
                    this.messages = response.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        addClick() {
            this.modalTitle = "Add Message";
            this.messageId = 0;
            this.messageContent = "";
            this.messageStatus = "";
            this.admin = "";
        },
        editClick(msg) {
            this.modalTitle = "Edit Message";
            this.messageId = msg.id;
            this.messageContent = msg.messageContent;
            this.messageStatus = msg.messageStatus;
            this.admin = msg.admin;
        },
        createOrUpdateClick() {
            if (this.messageId === 0) {
                axios.post(variables.API_URL + "messages", {
                        messageContent: this.messageContent,
                        messageStatus: this.messageStatus,
                        admin: this.admin
                    })
                    .then(response => {
                        this.refreshData();
                        alert(response.data);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            } else {
                axios.put(variables.API_URL + "messages/" + this.messageId, {
                        messageContent: this.messageContent,
                        messageStatus: this.messageStatus,
                        admin: this.admin
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
            if (!confirm("Are you sure you want to delete this message?")) {
                return;
            }
            axios.delete(variables.API_URL + "messages/" + id)
                .then(response => {
                    this.refreshData();
                    alert(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        },
        clearForm() {
            this.messageId = 0;
            this.messageContent = "";
            this.messageStatus = "";
            this.admin = "";
        }
    },
    mounted() {
        this.refreshData();
    }
};
