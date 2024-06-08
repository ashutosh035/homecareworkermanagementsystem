const customers = {
    template: `
  <div>
    <button type="button"
      class="btn btn-primary m-2 float-end"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      @click="addClick()">
      Add Customer
    </button>
  
    <table class="table table-striped">
      <thead>
        <tr>
          <th>
            <div class="d-flex flex-row">
              <input class="form-control m-2"
                v-model="CustomerIdFilter"
                v-on:keyup="FilterFn()"
                placeholder="Filter">
              <button type="button" class="btn btn-light" @click="sortResult('CustomerId', true)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                </svg>
              </button>
              <button type="button" class="btn btn-light" @click="sortResult('CustomerId', false)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                  <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                </svg>
              </button>
            </div>
            CustomerId
          </th>
          <th>
            <div class="d-flex flex-row">
              <input class="form-control m-2"
                v-model="CustomerNameFilter"
                v-on:keyup="FilterFn()"
                placeholder="Filter">
              <button type="button" class="btn btn-light" @click="sortResult('CustomerName', true)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                </svg>
              </button>
              <button type="button" class="btn btn-light" @click="sortResult('CustomerName', false)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                  <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                </svg>
              </button>
            </div>
            CustomerName
          </th>
          <th>
            Contact Info
          </th>
          <th>
            Address
          </th>
          <th>
            Date of Birth
          </th>
          <th>
            Medical History
          </th>
          <th>
            Preferred Language
          </th>
          <th>
            Emergency Contacts
          </th>
          <th>
            Options
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cust in customers" :key="cust.CustomerId">
          <td>{{ cust.CustomerId }}</td>
          <td>{{ cust.name }}</td>
          <td>{{ cust.contact_info }}</td>
          <td>{{ cust.address }}</td>
          <td>{{ cust.dob }}</td>
          <td>{{ cust.medical_history }}</td>
          <td>{{ cust.preferred_language }}</td>
          <td>{{ cust.emergency_contacts }}</td>
          <td>
            <button type="button"
              class="btn btn-light mr-1"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              @click="editClick(cust)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
              </svg>
            </button>
            <button type="button" @click="deleteClick(cust.CustomerId)" class="btn btn-light mr-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-9zM5 4.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-9z"/>
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ modalTitle }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
  
          <div class="modal-body">
            <div class="input-group mb-3">
              <span class="input-group-text">Name</span>
              <input type="text" class="form-control" v-model="name">
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">Contact Info</span>
              <input type="text" class="form-control" v-model="contact_info">
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">Address</span>
              <input type="text" class="form-control" v-model="address">
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">Date of Birth</span>
              <input type="date" class="form-control" v-model="dob">
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">Medical History</span>
              <textarea class="form-control" v-model="medical_history"></textarea>
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">Preferred Language</span>
              <input type="text" class="form-control" v-model="preferred_language">
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">Emergency Contacts</span>
              <textarea class="form-control" v-model="emergency_contacts"></textarea>
            </div>
  
            <button type="button" @click="createClick()" v-if="CustomerId == 0" class="btn btn-primary">
              Create
            </button>
            <button type="button" @click="updateClick()" v-if="CustomerId != 0" class="btn btn-primary">
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
        customers: [],
        modalTitle: "",
        name: "",
        contact_info: "",
        address: "",
        dob: "",
        medical_history: "",
        preferred_language: "",
        emergency_contacts: "",
        CustomerId: 0,
        CustomerIdFilter: "",
        CustomerNameFilter: "",
        customersWithoutFilter: []
      }
    },
    methods: {
      refreshData() {
        axios.get(variables.API_URL + "customers/")
          .then((response) => {
            this.customers = response.data;
            this.customersWithoutFilter = response.data;
          });
      },
      addClick() {
        this.modalTitle = "Add Customer";
        this.customerId = 0;
        this.name = "";
        this.contact_info = "";
        this.address = "";
        this.dob = "";
        this.medical_history = "";
        this.preferred_language = "";
        this.emergency_contacts = "";
    },
      editClick(cust) {
        this.modalTitle = "Edit Customer";
        this.CustomerId = cust.CustomerId;
        this.name = cust.name;
        this.contact_info = cust.contact_info;
        this.address = cust.address;
        this.dob = cust.dob;
        this.medical_history = cust.medical_history;
        this.preferred_language = cust.preferred_language;
        this.emergency_contacts = cust.emergency_contacts;
      },
      createClick() {
        axios.post(variables.API_URL + "customers/", {
          name: this.name,
          contact_info: this.contact_info,
          address: this.address,
          dob: this.dob,
          medical_history: this.medical_history,
          preferred_language: this.preferred_language,
          emergency_contacts: this.emergency_contacts
        })
          .then((response) => {
            this.refreshData();
            alert(response.data);
          });
      },
      updateClick() {
        axios.put(variables.API_URL + "customers/", {
          CustomerId: this.CustomerId,
          name: this.name,
          contact_info: this.contact_info,
          address: this.address,
          dob: this.dob,
          medical_history: this.medical_history,
          preferred_language: this.preferred_language,
          emergency_contacts: this.emergency_contacts
        })
          .then((response) => {
            this.refreshData();
            alert(response.data);
          });
      },
      deleteClick(id) {
        if (!confirm("Are you sure?")) {
          return;
        }
        axios.delete(variables.API_URL + "customers/" + id)
          .then((response) => {
            this.refreshData();
            alert(response.data);
          });
      },
      FilterFn() {
        var CustomerIdFilter = this.CustomerIdFilter;
        var CustomerNameFilter = this.CustomerNameFilter;
  
        this.customers = this.customersWithoutFilter.filter(
          function (el) {
            return el.CustomerId.toString().toLowerCase().includes(
              CustomerIdFilter.toString().trim().toLowerCase()
            ) &&
              el.name.toString().toLowerCase().includes(
                CustomerNameFilter.toString().trim().toLowerCase()
              )
          });
      },
      sortResult(prop, asc) {
        this.customers = this.customersWithoutFilter.sort(function (a, b) {
          if (asc) {
            return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
          } else {
            return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
          }
        })
      }
    },
    mounted() {
      this.refreshData();
    }
  };
  