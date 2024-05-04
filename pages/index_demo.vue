<style>
* {
  background-color: #fff !important;
}
body {
  padding-top: 0 !important;
}
</style>
<template>
  <div>
    <h1 class="text-center mt-2 text-warning">
      <strong>Impact Analysis</strong>
    </h1>
    <div class="row mt-2 mb-4">
      <div class="mt-1 col-6 mx-auto">
        <div class="text-start">
          <label for="formFile" class="form-label"><h4>Upload File</h4></label>
        </div>
        <div class="d-flex align-items-center">
          <input class="form-control" type="file" id="formFile" @change="handleFileChange" />
          <div class="text-center">
            <button class="btn btn-success text-white mx-2" type="button" @click="uploadFile"> Submit </button>
          </div>
        </div>
      </div>
    </div>
    <div style="height: 60vh; overflow-y: scroll">
      <table class="table">
        <thead style="position: sticky; top: 0">
          <tr>
            <th class="text-center" scope="col"><strong> Sr. No. </strong></th>
            <th class="text-center" scope="col"><strong> Filename </strong></th>
            <th class="text-center" scope="col">
              <strong> Date Of Submission </strong>
            </th>
            <th class="text-center" scope="col"><strong> Actions </strong></th>
          </tr>
        </thead>
        <tbody
          v-if="uploadedFiles && uploadedFiles.length > 0"
          class="scrollable-tbody"
        >
          <tr v-for="(file, index) in uploadedFiles" :key="index">
            <td class="text-center">{{ index + 1 }}</td>
            <td class="text-center">{{ file.Edi_filename }}</td>
            <td class="text-center">{{ file.Time }}</td>
            <td class="text-center">
              <button class="btn btn-info text-white mx-2" @click="fetchDataById(file._id)" > View </button>
            </td>
          </tr>
        </tbody>
        <tbody v-else class="text-center">
          <tr>
            <td colspan="4">
              <Strong class="text-danger"> No Files Found </Strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default { 
  middleware: 'auth', 
  created(){
    if (this.$auth.loggedIn) {
      console.log("auth in ",)
      // console.log("auth", this.$auth, this.$auth.loggedIn)
    }else{
      console.log("mounted")
    }
  },
  async asyncData({ store }) {
    console.log('default');
    await store.dispatch("fetchUploadedFiles");
  },

  data() {
    return {
      selectedFile: null,
      // uploadedFiles: [],
    };
  },

  computed: {
    uploadedFiles() {
      // console.log("upload files button clicked")
      return this.$store.state.uploadedFiles;
    },
  },

  methods: {
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
    },

    async uploadFile() {
      console.log("called");
      try {
        if (this.selectedFile) {
          if (
            this.selectedFile.type === "application/zip" ||
            this.selectedFile.type === "application/x-zip-compressed"
          ) {
            const formData = new FormData();
            formData.append("file", this.selectedFile);
            await axios
              .post(
                "https://upload-stage.carebidsexchange.com/api/eob_load",
                formData
              )
              .then((response) => {
                this.uploadedFiles = response.data.data;
                this.$store.dispatch("fetchUploadedFiles");
                console.log("File uploaded successfully", response);
                //alert('File Uploaded Successfully')
                console.log("File Uploaded Successfully");
              })
              .catch((error) => {
                console.error("Error uploading file:", error);
                //alert("Oops! Server error")
                console.log("Oops! Server error");
              });
            // clear file
            const fileInput = document.getElementById("formFile");
            if (fileInput) {
              fileInput.value = "";
              this.selectedFile = null;
            }
            console.log("end");
          } else {
            //alert("Please select a valid zip file only");
            console.log("Please select a valid zip file only");
          }
        } else {
          //alert("Please select a valid zip file");
          console.log("Please select a valid zip file");
        }
      } catch (err) {
        console.log("error in upload file button click", err);
      }
    },

    async fetchDataById(fileId) {
      try {
        console.log(typeof fileId);
        console.log(fileId);
        this.$router.push(`/files/${fileId}`);
        // Handle the fetched data as needed, e.g., update the state or navigate to another page
      } catch (error) {
        console.error("Error fetching data by ID:", error);
      }
    },
  },
};
</script>

<style>
.scrollable-tbody {
  max-height: 300px;
  overflow-y: auto;
}
</style>