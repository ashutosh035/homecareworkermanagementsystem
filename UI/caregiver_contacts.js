const caregiver_contacts = {
    template: `
        <div>
            <button type="button"
                    class="btn btn-primary m-2 fload-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    @click="addClick()">
                Add Caregiver Contact
            </button>

            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="contact in filteredContacts">
                        <td>{{ contact.phone }}</td>
                        <td>{{ contact.address }}</td>
                        <td>{{ contact.email }}</td>
                        <td>
                            <button type="button"
                                    class="btn btn-light mr-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    @click="editClick(contact)">
                                Edit
                            </button>
                            <button type="button"
                                    @click="deleteClick(contact.id)"
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
                                <span class="input-group-text">Phone</span>
                                <input type="text" class="form-control" v-model="phone">
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Address</span>
                                <input type="text" class="form-control" v-model="address">
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Email</span>
                                <input type="email" class="form-control" v-model="email">
                            </div>
                            <button type="button" @click="createOrUpdateClick()"
                                    v-if="contactId === 0" class="btn btn-primary">
                                Create
                            </button>
                            <button type="button" @click="createOrUpdateClick()"
                                    v-if="contactId !== 0" class="btn btn-primary">
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
            contacts: [],
            modalTitle: "",
            phone: "",
            address: "",
            email: "",
            contactId: 0,
            phoneFilter: "",
            addressFilter: "",
            emailFilter: "",
            filteredContacts: []
        };
    },
    methods: {
        refreshData() {
            // Assuming you have an API endpoint for caregiver contacts
            axios.get(variables.API_URL + "caregiver_contacts")
                .then(response => {
                    this.contacts = response.data;
                    this.filteredContacts = response.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        addClick() {
            this.modalTitle = "Add Caregiver Contact";
            this.contactId = 0;
            this.phone = "";
            this.address = "";
            this.email = "";
        },
        editClick(contact) {
            this.modalTitle = "Edit Caregiver Contact";
            this.contactId = contact.id;
            this.phone = contact.phone;
            this.address = contact.address;
            this.email = contact.email;
        },
        createOrUpdateClick() {
            if (this.contactId === 0) {
                axios.post(variables.API_URL + "caregiver_contacts", {
                        phone: this.phone,
                        address: this.address,
                        email: this.email
                    })
                    .then(response => {
                        this.refreshData();
                        alert(response.data);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            } else {
                axios.put(variables.API_URL + "caregiver_contacts/" + this.contactId, {
                        phone: this.phone,
                        address: this.address,
                        email: this.email
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
            if (!confirm("Are you sure you want to delete this contact?")) {
                return;
            }
            axios.delete(variables.API_URL + "caregiver_contacts/" + id)
                .then(response => {
                    this.refreshData();
                    alert(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        },
        clearForm() {
            this.contactId = 0;
            this.phone = "";
            this.address = "";
            this.email = "";
        },
        filterContacts() {
            this.filteredContacts = this.contacts.filter(contact => {
                return contact.phone.toString().includes(this.phoneFilter) &&
                    contact.address.toLowerCase().includes(this.addressFilter.toLowerCase()) &&
                    contact.email.toLowerCase().includes(this.emailFilter.toLowerCase());
            });
        },
        sortResult(prop, asc) {
            this.filteredContacts = this.filteredContacts.sort((a, b) => {
                if (asc) {
                    return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
                } else {
                    return b[prop] > a[prop] ? 1 : b[prop] < a[prop] ? -1 : 0;
                }
            });
        }
    },
    mounted() {
        this.refreshData();
    }
};
