import { UserService } from './../../services/user.service';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BlobServiceClient, AnonymousCredential, newPipeline } from '@azure/storage-blob';
import { environment } from '../../../environments/environment';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';

@Component({
    selector: 'app-newUser-root',
    templateUrl: './newUser.component.html',
    styleUrls: ['./newUser.component.css']
})
export class NewUserComponent {

    email: string = '';

    pass: string = '';
    cv: string = '';
    fecha: string = '';
    nameComplete: string = '';
    title = 'web1';
    currentFile: any = null;
    profileForm: any;

    constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }


    ngOnInit() {
        this.profileForm = this.fb.group({
            userName: ['', [Validators.required, Validators.email]],
            name: ['', Validators.required],
            repeatPassword: ['', Validators.required],
            password: ['', Validators.required]
        }, {
            validator: this.MustMatch('password', 'repeatPassword')
        });
    }

    get f() { return this.profileForm?.controls; }

    addUser() {
        let user = {
            id: String(Math.random()),
            userName: this.email,
            password: this.pass,
            cv: this.currentFile != null ? this.currentFile.name : '',
            fecha: new Date().toISOString().substr(0, 10),
            name: this.nameComplete,
            isDeleted: false,
        }

        this.userService.AddUser(user).subscribe();
        console.log(this.currentFile);
        if (this.currentFile != null)
            this.upload();

        this.router.navigate(["/user"]);
    }


    onFileChange(event: any) {
        this.currentFile = event.target.files[0];
    }


    async upload() {
        // generate account sas token
        const accountName = environment.accountName;
        const key = environment.key;
        const start = new Date(new Date().getTime() - (15 * 60 * 1000));
        const end = new Date(new Date().getTime() + (30 * 60 * 1000));
        const signedpermissions = 'rwdlac';
        const signedservice = 'b';
        const signedresourcetype = 'sco';
        const signedexpiry = end.toISOString().substring(0, end.toISOString().lastIndexOf('.')) + 'Z';
        const signedProtocol = 'https';
        const signedversion = '2018-03-28';

        const StringToSign =
            accountName + '\n' +
            signedpermissions + '\n' +
            signedservice + '\n' +
            signedresourcetype + '\n' +
            '\n' +
            signedexpiry + '\n' +
            '\n' +
            signedProtocol + '\n' +
            signedversion + '\n';
        var str = CryptoJS.HmacSHA256(StringToSign, CryptoJS.enc.Base64.parse(key));
        var sig = CryptoJS.enc.Base64.stringify(str);
        const sasToken = `sv=${(signedversion)}&ss=${(signedservice)}&srt=${(signedresourcetype)}&sp=${(signedpermissions)}&se=${encodeURIComponent(signedexpiry)}&spr=${(signedProtocol)}&sig=${encodeURIComponent(sig)}`;
        const containerName = environment.containerName;

        const pipeline = newPipeline(new AnonymousCredential(), {
            retryOptions: { maxTries: 4 }, // Retry options
            userAgentOptions: { userAgentPrefix: "AdvancedSample V1.0.0" }, // Customized telemetry string
            keepAliveOptions: {
                // Keep alive is enabled by default, disable keep alive by setting false
                enable: false
            }
        });

        const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net?${sasToken}`,
            pipeline)
        const containerClient = blobServiceClient.getContainerClient(containerName)
        if (!containerClient.exists()) {
            console.log("the container does not exit")
            await containerClient.create()

        }
        const client = containerClient.getBlockBlobClient(this.currentFile.name)
        const response = await client.uploadBrowserData(this.currentFile, {
            blockSize: 4 * 1024 * 1024, // 4MB block size
            concurrency: 20, // 20 concurrency
            onProgress: (ev) => console.log(ev),
            blobHTTPHeaders: { blobContentType: this.currentFile.type }
        })
        console.log(response._response.status)

    }

    MustMatch(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];

            if (matchingControl.errors && !matchingControl.errors.mustMatch) {
                // return if another validator has already found an error on the matchingControl
                return;
            }

            // set error on matchingControl if validation fails
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ mustMatch: true });
            } else {
                matchingControl.setErrors(null);
            }
        }
    }

    async download() {
        // generate account sas token
        const accountName = environment.accountName;
        const key = environment.key;
        const start = new Date(new Date().getTime() - (15 * 60 * 1000));
        const end = new Date(new Date().getTime() + (30 * 60 * 1000));
        const signedpermissions = 'rwdlac';
        const signedservice = 'b';
        const signedresourcetype = 'sco';
        const signedexpiry = end.toISOString().substring(0, end.toISOString().lastIndexOf('.')) + 'Z';
        const signedProtocol = 'https';
        const signedversion = '2018-03-28';

        const StringToSign =
            accountName + '\n' +
            signedpermissions + '\n' +
            signedservice + '\n' +
            signedresourcetype + '\n' +
            '\n' +
            signedexpiry + '\n' +
            '\n' +
            signedProtocol + '\n' +
            signedversion + '\n';
        var str = CryptoJS.HmacSHA256(StringToSign, CryptoJS.enc.Base64.parse(key));
        var sig = CryptoJS.enc.Base64.stringify(str);
        const sasToken = `sv=${(signedversion)}&ss=${(signedservice)}&srt=${(signedresourcetype)}&sp=${(signedpermissions)}&se=${encodeURIComponent(signedexpiry)}&spr=${(signedProtocol)}&sig=${encodeURIComponent(sig)}`;
        const containerName = environment.containerName;

        const pipeline = newPipeline(new AnonymousCredential(), {
            retryOptions: { maxTries: 4 }, // Retry options
            userAgentOptions: { userAgentPrefix: "AdvancedSample V1.0.0" }, // Customized telemetry string
            keepAliveOptions: {
                // Keep alive is enabled by default, disable keep alive by setting false
                enable: false
            }
        });

        const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net?${sasToken}`,
            pipeline)
        const containerClient = blobServiceClient.getContainerClient(containerName)
        if (!containerClient.exists()) {
            console.log("the container does not exit")
            await containerClient.create()

        }
        const client = containerClient.getBlockBlobClient(this.currentFile.name)
        const downloadBlockBlobResponse = await client.download(0);
        //  console.log('\t', await streamToString(downloadBlockBlobResponse.readableStreamBody));
        //  console.log(response._response.status)
    }
}


