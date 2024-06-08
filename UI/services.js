const services = {
    template: `
        <div>
            <button type="button"
                    class="btn btn-primary m-2 fload-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    @click="addClick()">
                Add Service
            </button>

            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Service Type</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Cost</th>
                        <th>Date Started</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="srv in services">
                        <td>{{ srv.serviceType }}</td>
                        <td>{{ srv.description }}</td>
                        <td>{{ srv.duration }}</td>
                        <td>{{ srv.cost }}</td>
                        <td>{{ srv.dateStarted }}</td>
                        <td>
                            <button type="button"
                                    class="btn btn-light mr-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    @click="editClick(srv)">
                                Edit
                            </button>
                            <button type="button"
                                    @click="deleteClick(srv.id)"
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
                                <span class="input-group-text">Service Type</span>
                                <input type="text" class="form-control" v-model="serviceType">
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Description</span>
                                <textarea class="form-control" v-model="description"></textarea>
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Duration</span>
                                <input type="time" class="form-control" v-model="duration">
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Cost</span>
                                <input type="number" class="form-control" v-model="cost">
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Date Started</span>
                                <input type="date" class="form-control" v-model="dateStarted">
                            </div>
                            <button type="button" @click="createOrUpdateClick()"
                                    v-if="serviceId === 0" class="btn btn-primary">
                                Create
                            </button>
                            <button type="button" @click="createOrUpdateClick()"
                                    v-if="serviceId !== 0" class="btn btn-primary">
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
            services: [],
            modalTitle: "",
            serviceType: "",
            description: "",
            duration: "",
            cost: 0,
            dateStarted: "",
            serviceId: 0
        }
    },
    methods: {
        refreshData() {
            axios.get(variables.API_URL + "services")
                .then(response => {
                    this.services = response.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        addClick() {
            this.modalTitle = "Add Service";
            this.serviceId = 0;
            this.serviceType = "";
            this.description = "";
            this.duration = "";
            this.cost = 0;
            this.dateStarted = "";
        },
        editClick(service) {
            this.modalTitle = "Edit Service";
            this.serviceId = service.id;
            this.serviceType = service.serviceType;
            this.description = service.description;
            this.duration = service.duration;
            this.cost = service.cost;
            this.dateStarted = service.dateStarted;
        },
        createOrUpdateClick() {
            if (this.serviceId === 0) {
                axios.post(variables.API_URL + "services", {
                        serviceType: this.serviceType,
                        description: this.description,
                        duration: this.duration,
                        cost: this.cost,
                        dateStarted: this.dateStarted
                    })
                    .then(response => {
                        this.refreshData();
                        alert(response.data);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            } else {
                axios.put(variables.API_URL + "services/" + this.serviceId, {
                        serviceType: this.serviceType,
                        description: this.description,
                        duration: this.duration,
                        cost: this.cost,
                        dateStarted: this.dateStarted
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
            if (!confirm("Are you sure you want to delete this service?")) {
                return;
            }
            axios.delete(variables.API_URL + "services/" + id)
                .then(response => {
                    this.refreshData();
                    alert(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        },
        clearForm() {
            this.serviceId = 0;
            this.serviceType = "";
            this.description = "";
            this.duration = "";
            this.cost = 0;
            this.dateStarted = "";
        }
    },
    mounted() {
        this.refreshData();
    }
};
