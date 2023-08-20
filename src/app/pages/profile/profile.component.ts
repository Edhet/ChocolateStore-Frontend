import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import UserInfo from "../../types/user-info";
import {ContentService} from "../../services/content.service";
import {PersonalInfoService} from "../../services/personal-info.service";
import {ToastComponent} from "../../modals/toast/toast.component";
import Address from "../../types/address";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @ViewChild('toast') toast?: ToastComponent

  public userInfo?: UserInfo
  public age?: number
  public categories: string[] = []

  public newAddressInfo: Address = {
    country: "",
    state: "",
    city: "",
    postalCode: "",
    road: "",
    number: 0
  }

  public fetchingData = false
  public fetchingAddress = false

  constructor(private authService: AuthService,
              private contentService: ContentService,
              private personalInfoService: PersonalInfoService,
              private router: Router
  ) {
  }

  async ngOnInit() {
    this.fetchingAddress = this.fetchingData = true

    this.categories = await this.contentService.getCategoryNames()
    this.userInfo = await this.personalInfoService.getUserInfo()

    if (this.userInfo.address)
      this.newAddressInfo = JSON.parse(JSON.stringify(this.userInfo.address))
    this.age = Math.floor((new Date().getTime() - new Date(this.userInfo.birthDate).getTime()) / 31536000000)

    this.fetchingAddress = this.fetchingData = false
  }

  public async logOut() {
    this.authService.logout()
    await this.router.navigate(["home"])
  }

  public async changePreferredCategory(categoryName: string) {
    if (categoryName == this.userInfo?.preferredCategory)
      return

    let response = await this.personalInfoService.updatePreferredCategory(categoryName)
    if (!response)
      this.userInfo!.preferredCategory = categoryName
    else
      this.toast?.showMessage(response.msg)
  }

  public async updateAddressInformation() {
    if (!this.newAddressInfo || !this.validAddress(this.newAddressInfo)) {
      this.toast?.showMessage("Preencha todos os campos")
      return
    }
    if (!this.changedValue(this.newAddressInfo, this.userInfo?.address)) {
      return
    }

    this.fetchingAddress = true
    let response = await this.personalInfoService.updateAddress(this.newAddressInfo!)
    if (!response)
      this.userInfo!.address = this.newAddressInfo
    else
      this.toast?.showMessage(response.msg)
    this.fetchingAddress = false
  }

  private changedValue(newAddress: Address, oldAddress?: Address | null) {
    if (!oldAddress)
      return true

    const newValues = Object.values(newAddress)
    const oldValues = Object.values(oldAddress!)

    for (const val of newValues)
      if (!oldValues.includes(val))
        return true
    return false
  }

  private validAddress(newAddress: Address) {
    const newValues = Object.values(newAddress)
    for (const val of newValues)
      if (val == 0 || val.length < 1)
        return false
    return true
  }
}
