const billings = {
    template: `
        <div>
            <button type="button"
                    class="btn btn-primary m-2 fload-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    @click="addClick()">
                Add Billing
            </button>

            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Invoice ID</th>
                        <th>Amount</th>
                        <th>Payment Status</th>
                        <th>Payment Method</th>
                        <th>Date</th>
                        <th>Schedule ID</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="bill in billings">
                        <td>{{ bill.invoiceId }}</td>
                        <td>{{ bill.amount }}</td>
                        <td>{{ bill.paymentStatus }}</td>
                        <td>{{ bill.paymentMethod }}</td>
                        <td>{{ bill.date }}</td>
                        <td>{{ bill.scheduleId }}</td>
                        <td>
                            <button type="button"
                                    class="btn btn-light mr-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    @click="editClick(bill)">
                                Edit
                            </button>
                            <button type="button"
                                    @click="deleteClick(bill.id)"
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
                                <span class="input-group-text">Invoice ID</span>
                                <input type="number" class="form-control" v-model="invoiceId">
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Amount</span>
                                <input type="text" class="form-control" v-model="amount">
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Payment Status</span>
                                <input type="text" class="form-control" v-model="paymentStatus">
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Payment Method</span>
                                <input type="text" class="form-control" v-model="paymentMethod">
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Date</span>
                                <input type="date" class="form-control" v-model="date">
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Schedule ID</span>
                                <input type="number" class="form-control" v-model="scheduleId">
                            </div>
                            <button type="button" @click="createOrUpdateClick()"
                                    v-if="billingId === 0" class="btn btn-primary">
                                Create
                            </button>
                            <button type="button" @click="createOrUpdateClick()"
                                    v-if="billingId !== 0" class="btn btn-primary">
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
            billings: [],
            modalTitle: "",
            invoiceId: 0,
            amount: 0,
            paymentStatus: "",
            paymentMethod: "",
            date: "",
            scheduleId: 0,
            billingId: 0
        }
    },
    methods: {
        refreshData() {
            axios.get(variables.API_URL + "billings")
                .then(response => {
                    this.billings = response.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        addClick() {
            this.modalTitle = "Add Billing";
            this.billingId = 0;
            this.invoiceId = 0;
            this.amount = 0;
            this.paymentStatus = "";
            this.paymentMethod = "";
            this.date = "";
            this.scheduleId = 0;
        },
        editClick(bill) {
            this.modalTitle = "Edit Billing";
            this.billingId = bill.id;
            this.invoiceId = bill.invoiceId;
            this.amount = bill.amount;
            this.paymentStatus = bill.paymentStatus;
            this.paymentMethod = bill.paymentMethod;
            this.date = bill.date;
            this.scheduleId = bill.scheduleId;
        },
        createOrUpdateClick() {
            if (this.billingId === 0) {
                axios.post(variables.API_URL + "billings", {
                        invoiceId: this.invoiceId,
                        amount: this.amount,
                        paymentStatus: this.paymentStatus,
                        paymentMethod: this.paymentMethod,
                        date: this.date,
                        schedule: this.scheduleId
                    })
                    .then(response => {
                        this.refreshData();
                        alert(response.data);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            } else {
                axios.put(variables.API_URL + "billings/" + this.billingId, {
                        invoiceId: this.invoiceId,
                        amount: this.amount,
                        paymentStatus: this.paymentStatus,
                        paymentMethod: this.paymentMethod,
                        date: this.date,
                        schedule: this.scheduleId
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
            if (!confirm("Are you sure you want to delete this billing?")) {
                return;
            }
            axios.delete(variables.API_URL + "billings/" + id)
                .then(response => {
                    this.refreshData();
                    alert(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        },
        clearForm() {
            this.billingId = 0;
            this.invoiceId = 0;
            this.amount = 0;
            this.paymentStatus = "";
            this.paymentMethod = "";
            this.date = "";
            this.scheduleId = 0;
        }
    },
    mounted() {
        this.refreshData();
    }
};
