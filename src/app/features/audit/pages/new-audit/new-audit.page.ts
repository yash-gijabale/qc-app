import { Component, OnDestroy, OnInit } from "@angular/core";
import { PageHeaderCompoent } from "../../../../layout/components/page-header/page-header.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { startWith, Subject, takeUntil } from "rxjs";
import { ButtonModule } from "primeng/button";
import { DatePickerModule } from "primeng/datepicker";
import { ConfirmationService } from "primeng/api";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { UserRepository } from "../../../../_db/repositories/user.repo";

@Component({
    selector: 'app-new-audit',
    templateUrl: './new-audit.page.html',
    imports: [PageHeaderCompoent, ReactiveFormsModule, ButtonModule, DatePickerModule, ConfirmDialogModule ],
    providers:[ConfirmationService],
    standalone: true
})
export class newAuditComponent implements OnInit, OnDestroy {

    constructor(
        private fb: FormBuilder,
        private confirmationService: ConfirmationService,
        private userRepo:UserRepository
    ) { }

    private destroy$ = new Subject<void>();

    pageTitle = 'Start New Inspection'

    auditForm: FormGroup


    ngOnInit(): void {

        this.userRepo.findById(6).subscribe(data => console.log(data))

        this.initForm()
        this.InitFormListerns()
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private initForm(): void {
        this.auditForm = this.fb.group({
            projectName: [null, Validators.required],
            address: [null, Validators.required],
            sampledArea: [null, Validators.required],
            inspectionType: [null, Validators.nullValidator],
            note: [null, Validators.nullValidator],
            isSchedule: [true, Validators.nullValidator],
            scheduledOn: [{ value: null, disabled: true }, Validators.nullValidator]
        })
    }

    handleFormSubmit(): void {
        if (!this.validateForm()) return
        console.log(this.auditForm.value)
    }

    private isScheduleCheckLister(): void {
        let scheduledOn = this.auditForm.get('scheduledOn');
        let isSchedule = this.auditForm.get('isSchedule');
        isSchedule?.valueChanges.pipe(
            startWith(isSchedule.value),
            takeUntil(this.destroy$
            ))
            .subscribe(checked => {
                if (!scheduledOn) return;
                if (!checked) {
                    scheduledOn.disable();
                    scheduledOn.reset();
                    scheduledOn.clearValidators();
                    return
                } else {
                    scheduledOn.enable()
                    scheduledOn.setValidators([Validators.required])
                }
                scheduledOn.updateValueAndValidity();
            })
    }

    private InitFormListerns(): void {
        this.isScheduleCheckLister()
    }

    private validateForm(): boolean {
        if (this.auditForm.invalid) return false
        return true;
    }



    confirm2(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Do you want to delete this record?',
            header: 'Danger Zone',
            icon: 'fa-solid fa-circle-exclamation',
            rejectLabel: 'Cancel',
            rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true
            },
            acceptButtonProps: {
                label: 'Delete',
                severity: 'danger'
            },
        
            accept: () => {
                console.log(true)
            },
            reject: () => {
                console.log(false)
            }
        });
    }
}