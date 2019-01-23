import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
// import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '../../shared/common.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    isActive: Boolean = false;
    showMenu: String = '';
    pushRightClass: string = 'push-right';
    role = null;

    constructor(
        private router: Router,
        private commonService: CommonService
    ) {
        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
        this.role = this.commonService.getRoleOfUser();
        
    }

    ngOnInit() {
        // console.log(this.commonService.getRoleOfUser());
        
    }
    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    // changeLang(language: string) {
    //     this.translate.use(language);
    // }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }
}
