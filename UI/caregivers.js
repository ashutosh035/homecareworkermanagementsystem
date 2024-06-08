const caregivers = {
    template: `
        <div>

            <button type="button"
                class="btn btn-primary m-2 fload-end"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                @click="addClick()">
                Add Caregiver
            </button>

            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Contact Information</th>
                        <th>Address</th>
                        <th>Specialization</th>
                        <th>Availability</th>
                        <th>Salary</th>
                        <th>Experience</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="caregiver in caregivers">
                        <td>{{ caregiver.name }}</td>
                        <td>{{ caregiver.contact_information }}</td>
                        <td>{{ caregiver.address }}</td>
                        <td>{{ caregiver.specialization }}</td>
                        <td>{{ caregiver.availability }}</td>
                        <td>{{ caregiver.salary }}</td>
                        <td>{{ caregiver.experience }}</td>
                        <td>
                            <button type="button"
                                class="btn btn-light mr-1"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                @click="editClick(caregiver)">
                                Edit
                            </button>
                            <button type="button"
                                class="btn btn-light mr-1"
                                @click="deleteClick(caregiver.id)">
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
                                <span class="input-group-text">Contact Information</span>
                                <input type="text" class="form-control" v-model="contactInformation">
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Address</span>
                                <input type="text" class="form-control" v-model="address">
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Specialization</span>
                                <input type="text" class="form-control" v-model="specialization">
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Availability</span>
                                <input type="text" class="form-control" v-model="availability">
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Salary</span>
                                <input type="number" class="form-control" v-model="salary">
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Experience</span>
                                <input type="number" class="form-control" v-model="experience">
                            </div>
                            <button type="button" @click="createClick()" v-if="id === 0" class="btn btn-primary">Create</button>
                            <button type="button" @click="updateClick()" v-else class="btn btn-primary">Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            caregivers: [],
            modalTitle: "",
            name: "",
            contactInformation: "",
            address: "",
            specialization: "",
            availability: "",
            salary: 0,
            experience: 0,
            id: 0
        };
    },
    methods: {
        refreshData() {
            // Assuming axios is used for API calls
            axios.get(variables.API_URL + "caregivers")
                .then(response => {
                    this.caregivers = response.data;
                })
                .catch(error => {
                    console.error("Error fetching caregivers: ", error);
                });
        },
        addClick() {
            this.modalTitle = "Add Caregiver";
            this.id = 0;
            this.name = "";
            this.contactInformation = "";
            this.address = "";
            this.specialization = "";
            this.availability = "";
            this.salary = 0;
            this.experience = 0;
        },
        editClick(caregiver) {
            this.modalTitle = "Edit Caregiver";
            this.id = caregiver.id;
            this.name = caregiver.name;
            this.contactInformation = caregiver.contactInformation;
            this.address = caregiver.address;
            this.specialization = caregiver.specialization;
            this.availability = caregiver.availability;
            this.salary = caregiver.salary;
            this.experience = caregiver.experience;
        },
        createClick() {
            axios.post(variables.API_URL + "caregivers", {
                name: this.name,
                contactInformation: this.contactInformation,
                address: this.address,
                specialization: this.specialization,
                availability: this.availability,
                salary: this.salary,
                experience: this.experience
            })
            .then(response => {
                this.refreshData();
                alert(response.data);
            })
            .catch(error => {
                console.error("Error creating caregiver: ", error);
            });
        },
        updateClick() {
            axios.put(variables.API_URL + "caregivers/" + this.id, {
                name: this.name,
                contactInformation: this.contactInformation,
                address: this.address,
                specialization: this.specialization,
                availability: this.availability,
                salary: this.salary,
                experience: this.experience
            })
            .then(response => {
                this.refreshData();
                alert(response.data);
            })
            .catch(error => {
                console.error("Error updating caregiver: ", error);
            });
        },
        deleteClick(id) {
            if (confirm("Are you sure you want to delete this caregiver?")) {
                axios.delete(variables.API_URL + "caregivers/" + id)
                .then(response => {
                    this.refreshData();
                    alert(response.data);
                })
                .catch(error => {
                    console.error("Error deleting caregiver: ", error);
                });
            }
        }
    },
    mounted() {
        this.refreshData();
    }
};
