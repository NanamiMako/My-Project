import {
  ClassicModel
} from '../../models/classic.js'
import {
  BookModel
} from '../../models/book.js'

let classicModel = new ClassicModel()
let bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: true,
    userInfo: null,
    classics: [],
    myBooksCount: 0,
    userName: "立即登录",
    userImg: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    this.getMyFavor()
    // this.hasGottenUserInfo()
    this.getMyBookCount()
  },

  // onShow:function(options){

  // },

  getMyBookCount() {
    bookModel.getMyBookCount(data => {
      this.setData({
        myBooksCount: data.count
      })
    })
  },

  bindgetuserinfo: function (e) {
    wx.getUserProfile({
      desc: '获取用户信息',
      success: (res) => {
        this.setData({
          userName: res.userInfo.nickName,
          userImg: res.userInfo.avatarUrl
        })
      }
    })
  },
  onGetUserInfo: function (event) {
    console.log(event);
    let userInfo = event.detail.userInfo
    if (userInfo) {
      this.setData({
        hasUserInfo: true,
        userInfo: userInfo
      })
    }
  },

  getMyFavor: function () {
    classicModel.getMyFavor((data) => {
      this.setData({
        classics: data
      })
    })
  },

  onPreviewTap: function (event) {
    wx.navigateTo({
      url: '/pages/classic-detail/classic-detail?cid=' + event.detail.cid + '&type=' + event.detail.type
    })
  },
  onJumpToAbout: function (event) {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },

  onStudy: function (event) {
    wx.navigateTo({
      url: '/pages/course/course',
    })
  },

  onShareAppMessage() {

  }
})