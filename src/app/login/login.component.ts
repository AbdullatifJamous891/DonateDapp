import { Component , OnInit , Inject , ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../util/data.service';
import { MatDialog , MatDialogRef , MAT_DIALOG_DATA } from '@angular/material';
import { RegisterComponent } from '../register/register.component';

@Component({
  encapsulation: ViewEncapsulation.None ,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  User = {}
  data : any
  message = ""

  constructor(
    private router: Router,
    private http:HttpClient,
    private Data:DataService ,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: any
  ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  goToSignup(): void {
    let dialogRef = this.dialog.open(RegisterComponent, {
      panelClass: 'custom-dialog-container'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  };

  login() {
  this.http.post('/api/login',this.User).subscribe(res => {
    this.data = res;
    //to store data in the browser's session
    localStorage.setItem('jwtToken', this.data.token);

    this.Data.getUserInfo();
    this.dialogRef.close();
    setTimeout(()=> {
        this.router.navigate(['home']);
        window.location.reload()
    }, 1000)


  }, err => {
    this.message = err.error.msg;
  });
}
}
