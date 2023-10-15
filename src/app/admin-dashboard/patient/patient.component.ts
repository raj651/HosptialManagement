import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { PatientService } from 'src/app/service/patient.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent {

  isLoggedIn = false;
  currentUser: any;
  public roles: string[] = [];
  showPatientBoard = false;
  showDoctorBoard = false;
  showAdminBoard = false;
  username?: string;
  patientList:any;
  department:any;

  constructor(private route:Router,private authService: AuthService, private tokenStorageService: TokenStorageService, private patientService: PatientService) { }

  
  form:any = {
    "patientID":'',
    "name":'',
    "phoneNo":'',
    "address":'',
    "age":'',
    "gender":''
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if(this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      console.log(this.roles[0]);
      this.username = user.username;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showPatientBoard = this.roles.includes('ROLE_PATIENT');
      this.showDoctorBoard = this.roles.includes('ROLE_DOCTOR');
    }
    this.currentUser = this.tokenStorageService.getUser().username;
    console.log(this.currentUser);

  }


  onSubmit(f:any) {
    console.log('f ',f)
    this.form = {
      name:f.value.name,
      phoneNo:f.value.phoneNo,
      address:f.value.address,
      age:f.value.age,
      patientID: f.value.patientID,
      department: this.department,
      gender: f.value.gender
    };

    console.log('form ',this.form)
    const existingData = JSON.parse(localStorage.getItem("patientdata") || '[]');
    // Check if the key already exists in localStorage
    if (existingData) {
      this.patientList = existingData;
      // Update or add new data to the existing list
      this.patientList.push(this.form);
    } 
    // Store the updated data in localStorage
    localStorage.setItem("patientdata", JSON.stringify(this.patientList));

    // this.patientService.postPatientFrom(this.form).subscribe((data) => {
    //   console.log(data);
    // })
  }


}
