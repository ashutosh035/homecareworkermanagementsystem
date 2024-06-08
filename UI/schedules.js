const schedules = {
    template: `
        <div>
            <button type="button"
                    class="btn btn-primary m-2 fload-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    @click="addClick()">
                Add Schedule
            </button>

            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Scheduled Time</th>
                        <th>Booked Date</th>
                        <th>Feedback</th>
                        <th>Caregiver</th>
                        <th>Service</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="sch in schedules">
                        <td>{{ sch.scheduledTime }}</td>
                        <td>{{ sch.bookedDate }}</td>
                        <td>{{ sch.feedback }}</td>
                        <td>{{ sch.caregiver }}</td>
                        <td>{{ sch.service }}</td>
                        <td>
                            <button type="button"
                                    class="btn btn-light mr-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    @click="editClick(sch)">
                                Edit
                            </button>
                            <button type="button"
                                    @click="deleteClick(sch.id)"
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
                                <span class="input-group-text">Scheduled Time</span>
                                <input type="datetime-local" class="form-control" v-model="scheduledTime">
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Booked Date</span>
                                <input type="date" class="form-control" v-model="bookedDate">
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Feedback</span>
                                <input type="number" class="form-control" v-model="feedback">
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Caregiver</span>
                                <select class="form-select" v-model="caregiverId">
                                    <option v-for="cg in caregivers" :value="cg.id">{{ cg.name }}</option>
                                </select>
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Service</span>
                                <select class="form-select" v-model="serviceId">
                                    <option v-for="srv in services" :value="srv.id">{{ srv.serviceType }}</option>
                                </select>
                            </div>
                            <button type="button" @click="createOrUpdateClick()"
                                    v-if="scheduleId === 0" class="btn btn-primary">
                                Create
                            </button>
                            <button type="button" @click="createOrUpdateClick()"
                                    v-if="scheduleId !== 0" class="btn btn-primary">
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
            schedules: [],
            modalTitle: "",
            scheduledTime: "",
            bookedDate: "",
            feedback: 0,
            caregiverId: 0,
            serviceId: 0,
            scheduleId: 0,
            caregivers: [],
            services: []
        }
    },
    methods: {
        refreshData() {
            axios.get(variables.API_URL + "schedules")
                .then(response => {
                    this.schedules = response.data;
                })
                .catch(error => {
                    console.error(error);
                });
            axios.get(variables.API_URL + "caregivers")
                .then(response => {
                    this.caregivers = response.data;
                })
                .catch(error => {
                    console.error(error);
                });
            axios.get(variables.API_URL + "services")
                .then(response => {
                    this.services = response.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        addClick() {
            this.modalTitle = "Add Schedule";
            this.scheduleId = 0;
            this.scheduledTime = "";
            this.bookedDate = "";
            this.feedback = 0;
            this.caregiverId = 0;
            this.serviceId = 0;
        },
        editClick(schedule) {
            this.modalTitle = "Edit Schedule";
            this.scheduleId = schedule.id;
            this.scheduledTime = schedule.scheduledTime;
            this.bookedDate = schedule.bookedDate;
            this.feedback = schedule.feedback;
            this.caregiverId = schedule.caregiver.id;
            this.serviceId = schedule.service.id;
        },
        createOrUpdateClick() {
            if (this.scheduleId === 0) {
                axios.post(variables.API_URL + "schedules", {
                        scheduledTime: this.scheduledTime,
                        bookedDate: this.bookedDate,
                        feedback: this.feedback,
                        caregiver: this.caregiverId,
                        service: this.serviceId
                    })
                    .then(response => {
                        this.refreshData();
                        alert(response.data);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            } else {
                axios.put(variables.API_URL + "schedules/" + this.scheduleId, {
                        scheduledTime: this.scheduledTime,
                        bookedDate: this.bookedDate,
                        feedback: this.feedback,
                        caregiver: this.caregiverId,
                        service: this.serviceId
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
            if (!confirm("Are you sure you want to delete this schedule?")) {
                return;
            }
            axios.delete(variables.API_URL + "schedules/" + id)
                .then(response => {
                    this.refreshData();
                    alert(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        },
        clearForm() {
            this.scheduleId = 0;
            this.scheduledTime = "";
            this.bookedDate = "";
            this.feedback = 0;
            this.caregiverId = 0;
            this.serviceId = 0;
        }
    },
    mounted() {
        this.refreshData();
    }
};
