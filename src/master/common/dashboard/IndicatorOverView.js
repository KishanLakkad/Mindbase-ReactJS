import React from "react";
import { Chart } from 'react-charts';
import { PieChart } from 'react-minimal-pie-chart';
import axios from "axios";
import moment from "moment";

const SERIES = {
  type: 'bar'
};

class IndicatorOverView extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = this.getInitState();
    this.getInitState = this.getInitState.bind(this);
    this.filterByDepartment = this.filterByDepartment.bind(this);
  }
  getInitState() {
    return {
      page: "Login Page",
      pieData: [
        { title: 'Male', value: 70, color: '#6AB6ED' },
        { title: 'Female', value: 30, color: '#FF568C' },
      ],
      day_filter: "7_days",
      activeMoodIndex: 0,
      verticleFeelingActive: 0,
      moodList: [
        { shortTitle: "Mood", image: "/assets/img/mood.webp" },
        { shortTitle: "Stress", image: "/assets/img/stress.webp" },
        { shortTitle: "Rest", image: "/assets/img/rest.webp" },
        { shortTitle: "Thoughts", image: "/assets/img/thouhts.png" },
        { shortTitle: "Breath", image: "/assets/img/breath.png" },
        { shortTitle: "Get Help", image: "/assets/img/get-help.png" }
      ],
      verticleFeeling: [],
      totalUsers: 0,
      totalFemale: 0,
      totalMale: 0,
      activeRestType: "yep",
      axis: [
        { primary: true, type: 'ordinal', position: 'bottom' },
        { position: 'left', type: 'linear', stacked: true }
      ],
      chartRfresh: true,
      chartData: [{ label: "Mood", data: [["Mon", 50], ["Tue", 175], ["Wed", 250], ["Thu", 50], ["Fri", 170], ["Sat", 190], ["Sun", 180]] }],
      chartTitle: "Behavioral Activity"
    }
  }
  componentDidMount() {
    let self = this;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem("mb_autorization");
    axios.get(`/feeling`)
      .then(function (response) {
        if (response.status === 200) {
          self.setState({
            verticleFeeling: response.data.data.main
          })
        }
      })
      .catch(function (error) {

      });
    axios.defaults.headers.common['Authorization'] = localStorage.getItem("mb_autorization");
    axios.get(`/activity`)
      .then(function (response) {
        if (response.status === 200) {
          // console.log(response.data);
          let staticList = [
            { shortTitle: "Mood", image: "/assets/img/mood.webp" },
            { shortTitle: "Stress", image: "/assets/img/stress.webp" },
            { shortTitle: "Rest", image: "/assets/img/rest.webp" },
            { shortTitle: "Thoughts", image: "/assets/img/thouhts.png" },
            { shortTitle: "Breath", image: "/assets/img/breath.png" }
          ];
          let moodList = [...staticList, ...response.data.data];
          let staticOne = [{ shortTitle: "Get Help", image: "/assets/img/get-help.png" }];
          moodList = [...moodList, ...staticOne];
          self.setState({
            moodList
          });
        }
      })
      .catch(function (error) {

      });
    this.filterByDepartment();
  }
  filterByDepartment() {
    let self = this;
    setTimeout(function () {
      var endDate = new Date();
      var startDate = new Date();
      if (self.state.day_filter === "7_days") {
        startDate.setDate(startDate.getDate() - 7);
      } else if (self.state.day_filter === "14_days") {
        startDate.setDate(startDate.getDate() - 14);
      } else if (self.state.day_filter === "30_days") {
        startDate.setDate(startDate.getDate() - 30);
      }
      let senddata = {
        department: localStorage.getItem("mb_department"),
        startDate: moment(startDate).format("YYYY-MM-DDTHH:MM:SSZ"),
        endDate: moment(endDate).format("YYYY-MM-DDTHH:MM:SSZ")
      };
      if (self.state.activeMoodIndex === 0) {
        // if (self.state.day_filter === "7_days") {
        //   self.setState({
        //     chartData: [{ label: "Mood", data: [["Mon", 50],["Tue", 175],["Wed", 250],["Thu", 50],["Fri", 170],["Sat", 190],["Sun", 180]] }],
        //     axis: [
        //       { primary: true, type: 'ordinal', position: 'bottom' },
        //       { position: 'left', type: 'linear', stacked: true }
        //     ]
        //   });
        // } else if (self.state.day_filter === "14_days") {
        //   self.setState({
        //     chartData: [{ label: "Mood", data: [
        //       ["1", 50],["2", 175],["3", 250],["4", 50],["5", 170],["6", 190],["7", 180],
        //       ["8", 50],["9", 175],["10", 250],["11", 50],["12", 170],["13", 190],["14", 180]
        //     ] }],
        //     axis: [
        //       { primary: true, type: 'ordinal', position: 'bottom' },
        //       { position: 'left', type: 'linear', stacked: true }
        //     ]
        //   });
        // } else if (self.state.day_filter === "30_days") {
        //   self.setState({
        //     chartData: [{ label: "Mood", data: [
        //       ["1", 50],["2", 175],["3", 250],["4", 50],["5", 170],["6", 190],["7", 180],
        //       ["8", 50],["9", 175],["10", 250],["11", 50],["12", 170],["13", 190],["14", 180],
        //       ["15", 50],["16", 175],["17", 250],["18", 50],["19", 170],["20", 190],["21", 180],
        //       ["22", 50],["23", 175],["24", 250],["25", 50],["26", 170],["27", 190],["28", 180]
        //     ] }],
        //     axis: [
        //       { primary: true, type: 'ordinal', position: 'bottom' },
        //       { position: 'left', type: 'linear', stacked: true }
        //     ]
        //   });
        // }

        axios.defaults.headers.common['Authorization'] = localStorage.getItem("mb_autorization");
        axios.post(`/mood/filterByDepartment`, senddata)
          .then(function (response) {
            if (response.status === 200) {
              self.setState({
                chartRfresh: false
              });
              let females = response.data.data.filter(function (i, n) {
                return i.user.gender == 'female';
              });
              let males = response.data.data.filter(function (i, n) {
                return i.user.gender == 'male';
              });
              let pieData = [
                { title: 'Male', value: parseInt((males.length / response.data.data.length) * 100), color: '#6AB6ED' },
                { title: 'Female', value: parseInt((females.length / response.data.data.length) * 100), color: '#FF568C' },
              ];
              self.setState({
                totalUsers: response.data.data.length,
                totalMale: males.length,
                totalFemale: females.length,
                pieData
              });

              const groups = response.data.data.reduce((groups, game) => {
                let date = game.createdAt.split('T')[0];
                date = moment(date).format("DD MMM");
                if (!groups[date]) {
                  groups[date] = [];
                }
                groups[date].push(game);
                return groups;
              }, {});
              let groupArrays = Object.keys(groups).map((date, index) => {
                date = moment(date).format("DD MMM");
                index++;
                return [
                  index,
                  groups[date].length
                ];
              });
              let chartData = [];
              let chartObj = {};
              chartObj['label'] = self.state.moodList[self.state.activeMoodIndex].shortTitle;
              chartObj['data'] = groupArrays;
              chartData.push(chartObj);
              console.log(chartData);
              self.setState({
                chartData,
                chartRfresh: true,
                chartTitle: self.state.moodList[self.state.activeMoodIndex].shortTitle
              });
            }
          })
          .catch(function (error) {

          });
      }
      if (self.state.activeMoodIndex === 1) {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem("mb_autorization");
        axios.post(`/mood/filterByDepartment`, senddata)
          .then(function (response) {
            if (response.status === 200) {
              self.setState({
                chartRfresh: false
              });
              let females = response.data.data.filter(function (i, n) {
                return i.user.gender == 'female';
              });
              let males = response.data.data.filter(function (i, n) {
                return i.user.gender == 'male';
              });
              let pieData = [
                { title: 'Male', value: parseInt((males.length / response.data.data.length) * 100), color: '#6AB6ED' },
                { title: 'Female', value: parseInt((females.length / response.data.data.length) * 100), color: '#FF568C' },
              ];
              self.setState({
                totalUsers: response.data.data.length,
                totalMale: males.length,
                totalFemale: females.length,
                pieData
              });
              const groups = response.data.data.reduce((groups, game) => {
                if (!groups[game.stress]) {
                  groups[game.stress] = [];
                }
                groups[game.stress].push(game);
                return groups;
              }, {});

              const groupArrays = Object.keys(groups).map((date) => {
                return [
                  date,
                  groups[date].length
                ];
              });

              let chartData = [];
              let chartObj = {};
              chartObj['label'] = self.state.moodList[self.state.activeMoodIndex].shortTitle;
              chartObj['data'] = groupArrays;
              chartData.push(chartObj);
              self.setState({
                chartData,
                chartRfresh: true,
                chartTitle: self.state.moodList[self.state.activeMoodIndex].shortTitle
              });
            }
          })
          .catch(function (error) {

          });
      }
      if (self.state.activeMoodIndex === 2) {
        // if (self.state.day_filter === "7_days") {
        //   self.setState({
        //     chartData: [{ label: "Rest", data: [["Mon", 50],["Tue", 175],["Wed", 250],["Thu", 50],["Fri", 170],["Sat", 190],["Sun", 180]] }],
        //     axis: [
        //       { primary: true, type: 'ordinal', position: 'bottom' },
        //       { position: 'left', type: 'linear', stacked: true }
        //     ]
        //   });
        // } else if (self.state.day_filter === "14_days") {
        //   self.setState({
        //     chartData: [{ label: "Rest", data: [
        //       ["1", 50],["2", 175],["3", 250],["4", 50],["5", 170],["6", 190],["7", 180],
        //       ["8", 50],["9", 175],["10", 250],["11", 50],["12", 170],["13", 190],["14", 180]
        //     ] }],
        //     axis: [
        //       { primary: true, type: 'ordinal', position: 'bottom' },
        //       { position: 'left', type: 'linear', stacked: true }
        //     ]
        //   });
        // } else if (self.state.day_filter === "30_days") {
        //   self.setState({
        //     chartData: [{ label: "Rest", data: [
        //       ["1", 50],["2", 175],["3", 250],["4", 50],["5", 170],["6", 190],["7", 180],
        //       ["8", 50],["9", 175],["10", 250],["11", 50],["12", 170],["13", 190],["14", 180],
        //       ["15", 50],["16", 175],["17", 250],["18", 50],["19", 170],["20", 190],["21", 180],
        //       ["22", 50],["23", 175],["24", 250],["25", 50],["26", 170],["27", 190],["28", 180]
        //     ] }],
        //     axis: [
        //       { primary: true, type: 'ordinal', position: 'bottom' },
        //       { position: 'left', type: 'linear', stacked: true }
        //     ]
        //   });
        // }
        axios.defaults.headers.common['Authorization'] = localStorage.getItem("mb_autorization");
        axios.post(`/mood/filterByDepartment`, senddata)
          .then(function (response) {
            if (response.status === 200) {
              self.setState({
                chartRfresh: false
              });
              let females = response.data.data.filter(function (i, n) {
                return i.user.gender == 'female';
              });
              let males = response.data.data.filter(function (i, n) {
                return i.user.gender == 'male';
              });
              let pieData = [
                { title: 'Male', value: parseInt((males.length / response.data.data.length) * 100), color: '#6AB6ED' },
                { title: 'Female', value: parseInt((females.length / response.data.data.length) * 100), color: '#FF568C' },
              ];
              self.setState({
                totalUsers: response.data.data.length,
                totalMale: males.length,
                totalFemale: females.length,
                pieData
              });

              let finalData = response.data.data.filter(function (i, n) {
                return i.rested == 'yep';
              });

              const groups = finalData.reduce((groups, game) => {
                let date = game.createdAt.split('T')[0];
                date = moment(date).format("DD MMM");
                if (!groups[date]) {
                  groups[date] = [];
                }
                groups[date].push(game);
                return groups;
              }, {});

              const groupArrays = Object.keys(groups).map((date, index) => {
                date = moment(date).format("DD MMM");
                index++;
                return [
                  index,
                  groups[date].length
                ];
              });
              let chartData = [];
              let chartObj = {};
              chartObj['label'] = self.state.moodList[self.state.activeMoodIndex].shortTitle;
              chartObj['data'] = groupArrays;
              chartData.push(chartObj);
              self.setState({
                chartData,
                chartRfresh: true,
                chartTitle: self.state.moodList[self.state.activeMoodIndex].shortTitle
              });

            }
          })
          .catch(function (error) {

          });
      }
      if (self.state.activeMoodIndex === 3) {
        // self.setState({
        //   chartData: [{ label: "Thoughts", data: [
        //     ["Empty", 50],["Composed", 175],["Racing", 250]
        //   ] }],
        //   axis: [
        //     { primary: true, type: 'ordinal', position: 'bottom' },
        //     { position: 'left', type: 'linear', stacked: true }
        //   ]
        // })
        axios.defaults.headers.common['Authorization'] = localStorage.getItem("mb_autorization");
        axios.post(`/mood/filterByDepartment`, senddata)
          .then(function (response) {
            if (response.status === 200) {
              self.setState({
                chartRfresh: false
              });
              let females = response.data.data.filter(function (i, n) {
                return i.user.gender == 'female';
              });
              let males = response.data.data.filter(function (i, n) {
                return i.user.gender == 'male';
              });
              let pieData = [
                { title: 'Male', value: parseInt((males.length / response.data.data.length) * 100), color: '#6AB6ED' },
                { title: 'Female', value: parseInt((females.length / response.data.data.length) * 100), color: '#FF568C' },
              ];
              self.setState({
                totalUsers: response.data.data.length,
                totalMale: males.length,
                totalFemale: females.length,
                pieData
              });

              const groups = response.data.data.reduce((groups, game) => {
                if (!groups[game.thought]) {
                  groups[game.thought] = [];
                }
                groups[game.thought].push(game);
                return groups;
              }, {});

              const groupArrays = Object.keys(groups).map((date) => {
                return [
                  date,
                  groups[date].length
                ];
              });

              let chartData = [];
              let chartObj = {};
              chartObj['label'] = self.state.moodList[self.state.activeMoodIndex].shortTitle;
              chartObj['data'] = groupArrays;
              chartData.push(chartObj);
              self.setState({
                chartData,
                chartRfresh: true,
                chartTitle: self.state.moodList[self.state.activeMoodIndex].shortTitle
              });
            }
          })
          .catch(function (error) {

          });
      }
      if (self.state.activeMoodIndex === 4) {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem("mb_autorization");
        axios.post(`/breathLog/filterByDepartment`, senddata)
          .then(function (response) {
            if (response.status === 200) {
              self.setState({
                chartRfresh: false
              });
              let females = response.data.data.filter(function (i, n) {
                return i.user.gender == 'female';
              });
              let males = response.data.data.filter(function (i, n) {
                return i.user.gender == 'male';
              });
              let pieData = [
                { title: 'Male', value: parseInt((males.length / response.data.data.length) * 100), color: '#6AB6ED' },
                { title: 'Female', value: parseInt((females.length / response.data.data.length) * 100), color: '#FF568C' },
              ];
              self.setState({
                totalUsers: response.data.data.length,
                totalMale: males.length,
                totalFemale: females.length,
                pieData
              });

              const groups = response.data.data.reduce((groups, game) => {
                let date = game.createdAt.split('T')[0];
                date = moment(date).format("DD MMM");
                if (!groups[date]) {
                  groups[date] = [];
                }
                groups[date].push(game);
                return groups;
              }, {});
              let groupArrays = Object.keys(groups).map((date, index) => {
                date = moment(date).format("DD MMM");
                index++;
                return [
                  index,
                  groups[date].length
                ];
              });

              let chartData = [];
              let chartObj = {};
              chartObj['label'] = self.state.moodList[self.state.activeMoodIndex].shortTitle;
              chartObj['data'] = groupArrays;
              chartData.push(chartObj);
              self.setState({
                chartData,
                chartRfresh: true,
                chartTitle: self.state.moodList[self.state.activeMoodIndex].shortTitle
              });
            }
          })
          .catch(function (error) {

          });
      }
      if (self.state.activeMoodIndex === 5 || self.state.activeMoodIndex === 6 || self.state.activeMoodIndex === 7 || self.state.activeMoodIndex === 8 || self.state.activeMoodIndex === 9) {
        senddata['activity'] = self.state.moodList[self.state.activeMoodIndex]._id;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem("mb_autorization");
        axios.post(`/activityLog/filterByDepartmentAndActivity`, senddata)
          .then(function (response) {
            if (response.status === 200) {
              self.setState({
                chartRfresh: false
              });
              let females = response.data.data.filter(function (i, n) {
                return i.user.gender == 'female';
              });
              let males = response.data.data.filter(function (i, n) {
                return i.user.gender == 'male';
              });
              let pieData = [
                { title: 'Male', value: parseInt((males.length / response.data.data.length) * 100), color: '#6AB6ED' },
                { title: 'Female', value: parseInt((females.length / response.data.data.length) * 100), color: '#FF568C' },
              ];
              self.setState({
                totalUsers: response.data.data.length,
                totalMale: males.length,
                totalFemale: females.length,
                pieData
              });

              const groups = response.data.data.reduce((groups, game) => {
                let date = game.createdAt.split('T')[0];
                date = moment(date).format("DD MMM");
                if (!groups[date]) {
                  groups[date] = [];
                }
                groups[date].push(game);
                return groups;
              }, {});
              let groupArrays = Object.keys(groups).map((date, index) => {
                date = moment(date).format("DD MMM");
                index++;
                return [
                  index,
                  groups[date].length
                ];
              });

              let chartData = [];
              let chartObj = {};
              chartObj['label'] = self.state.moodList[self.state.activeMoodIndex].shortTitle;
              chartObj['data'] = groupArrays;
              chartData.push(chartObj);
              self.setState({
                chartData,
                chartRfresh: true,
                chartTitle: self.state.moodList[self.state.activeMoodIndex].shortTitle
              });
            }
          })
          .catch(function (error) {

          });
      }
      if (self.state.activeMoodIndex === 10) {

        // if (self.state.day_filter === "7_days") {
        //   self.setState({
        //     chartData: [
        //       { label: "Call", data: [["Mon", 50],["Tue", 145],["Wed", 250],["Thu", 25],["Fri", 170],["Sat", 150],["Sun", 180]] },
        //       { label: "Text", data: [["Mon", 40],["Tue", 175],["Wed", 200],["Thu", 50],["Fri", 100],["Sat", 190],["Sun", 140]] }
        //     ],
        //     axis: [
        //       { primary: true, type: 'ordinal', position: 'bottom' },
        //       { position: 'left', type: 'linear', stacked: false }
        //     ]
        //   });
        // } else if (self.state.day_filter === "14_days") {
        //   self.setState({
        //     chartData: [{ label: "Rest", data: [
        //       ["1", 50],["2", 175],["3", 250],["4", 50],["5", 170],["6", 190],["7", 180],
        //       ["8", 50],["9", 175],["10", 250],["11", 50],["12", 170],["13", 190],["14", 180]
        //     ] }],
        //     axis: [
        //       { primary: true, type: 'ordinal', position: 'bottom' },
        //       { position: 'left', type: 'linear', stacked: false }
        //     ]
        //   });
        // } else if (self.state.day_filter === "30_days") {
        //   self.setState({
        //     chartData: [{ label: "Rest", data: [
        //       ["1", 50],["2", 175],["3", 250],["4", 50],["5", 170],["6", 190],["7", 180],
        //       ["8", 50],["9", 175],["10", 250],["11", 50],["12", 170],["13", 190],["14", 180],
        //       ["15", 50],["16", 175],["17", 250],["18", 50],["19", 170],["20", 190],["21", 180],
        //       ["22", 50],["23", 175],["24", 250],["25", 50],["26", 170],["27", 190],["28", 180]
        //     ] }],
        //     axis: [
        //       { primary: true, type: 'ordinal', position: 'bottom' },
        //       { position: 'left', type: 'linear', stacked: false }
        //     ]
        //   });
        // }

        axios.defaults.headers.common['Authorization'] = localStorage.getItem("mb_autorization");
        axios.post(`/assistanceLog/filterByDepartment`, senddata)
          .then(function (response) {
            if (response.status === 200) {
              self.setState({
                // chartRfresh: false
              });
              let females = response.data.data.filter(function (i, n) {
                return i.user.gender == 'female';
              });
              let males = response.data.data.filter(function (i, n) {
                return i.user.gender == 'male';
              });
              let pieData = [
                { title: 'Male', value: parseInt((males.length / response.data.data.length) * 100), color: '#6AB6ED' },
                { title: 'Female', value: parseInt((females.length / response.data.data.length) * 100), color: '#FF568C' },
              ];
              self.setState({
                totalUsers: response.data.data.length,
                totalMale: males.length,
                totalFemale: females.length,
                // pieData
              });

              let callData = response.data.data.filter(function (i, n) {
                return i.assistanceType == 'call';
              });
              let textData = response.data.data.filter(function (i, n) {
                return i.assistanceType == 'text';
              });

              let groups = callData.reduce((groups, game) => {
                let date = game.createdAt.split('T')[0];
                date = moment(date).format("DD MMM");
                if (!groups[date]) {
                  groups[date] = [];
                }
                groups[date].push(game);
                return groups;
              }, {});

              let groupArrays = Object.keys(groups).map((date, index) => {
                date = moment(date).format("DD MMM");
                index++;
                return [
                  index,
                  groups[date].length
                ];
              });
              let chartData = [];
              let chartObj = {};
              chartObj['label'] = "Call";
              chartObj['data'] = groupArrays;
              chartData.push(chartObj);

              groups = textData.reduce((groups, game) => {
                let date = game.createdAt.split('T')[0];
                date = moment(date).format("DD MMM");
                if (!groups[date]) {
                  groups[date] = [];
                }
                groups[date].push(game);
                return groups;
              }, {});

              groupArrays = Object.keys(groups).map((date, index) => {
                date = moment(date).format("DD MMM");
                index++;
                return [
                  index,
                  groups[date].length
                ];
              });
              chartObj = {};
              chartObj['label'] = self.state.moodList[self.state.activeMoodIndex].shortTitle;
              chartObj['data'] = groupArrays;
              chartData.push(chartObj);
              self.setState({
                chartData,
                chartRfresh: true,
                chartTitle: self.state.moodList[self.state.activeMoodIndex].shortTitle
              });
            }
          })
          .catch(function (error) {

          });
      }
    }, 500);
  }
  filterVerticleMood(index) {
    this.setState({
      verticleFeelingActive: index
    });
    let self = this;
    setTimeout(function () {
      var endDate = new Date();
      var startDate = new Date();
      if (self.state.day_filter === "7_days") {
        startDate.setDate(startDate.getDate() - 7);
      } else if (self.state.day_filter === "14_days") {
        startDate.setDate(startDate.getDate() - 14);
      } else if (self.state.day_filter === "30_days") {
        startDate.setDate(startDate.getDate() - 30);
      }
      let senddata = {
        department: localStorage.getItem("mb_department"),
        startDate: moment(startDate).format("YYYY-MM-DDTHH:MM:SSZ"),
        endDate: moment(endDate).format("YYYY-MM-DDTHH:MM:SSZ")
      }
      axios.defaults.headers.common['Authorization'] = localStorage.getItem("mb_autorization");
      axios.post(`/mood/filterByDepartment`, senddata)
        .then(function (response) {
          if (response.status === 200) {
            self.setState({
              chartRfresh: false
            });
            let females = response.data.data.filter(function (i, n) {
              return i.user.gender == 'female';
            });
            let males = response.data.data.filter(function (i, n) {
              return i.user.gender == 'male';
            });
            let pieData = [
              { title: 'Male', value: parseInt((males.length / response.data.data.length) * 100), color: '#6AB6ED' },
              { title: 'Female', value: parseInt((females.length / response.data.data.length) * 100), color: '#FF568C' },
            ];
            self.setState({
              totalUsers: response.data.data.length,
              totalMale: males.length,
              totalFemale: females.length,
              pieData
            });
            let finalData = response.data.data.filter(function (i, n) {
              return i.mainFeeling._id == self.state.verticleFeeling[index]._id;
            });

            const groups = finalData.reduce((groups, game) => {
              let date = game.createdAt.split('T')[0];
              date = moment(date).format("DD MMM");
              if (!groups[date]) {
                groups[date] = [];
              }
              groups[date].push(game);
              return groups;
            }, {});
            const groupArrays = Object.keys(groups).map((date) => {
              date = moment(date).format("DD MMM");
              return [
                date,
                groups[date].length
              ];
            });
            let chartData = [];
            let chartObj = {};
            chartObj['label'] = self.state.moodList[self.state.activeMoodIndex].shortTitle;
            chartObj['data'] = groupArrays;
            chartData.push(chartObj);
            self.setState({
              chartData,
              chartRfresh: true
            });
          }
        })
        .catch(function (error) {

        });
    }, 500);
  }
  filterVerticleRest(type) {
    let self = this;
    this.setState({
      activeRestType: type
    })
    var endDate = new Date();
    var startDate = new Date();
    if (self.state.day_filter === "7_days") {
      startDate.setDate(startDate.getDate() - 7);
    } else if (self.state.day_filter === "14_days") {
      startDate.setDate(startDate.getDate() - 14);
    } else if (self.state.day_filter === "30_days") {
      startDate.setDate(startDate.getDate() - 30);
    }
    let senddata = {
      department: localStorage.getItem("mb_department"),
      startDate: moment(startDate).format("YYYY-MM-DDTHH:MM:SSZ"),
      endDate: moment(endDate).format("YYYY-MM-DDTHH:MM:SSZ")
    }
    axios.defaults.headers.common['Authorization'] = localStorage.getItem("mb_autorization");
    axios.post(`/mood/filterByDepartment`, senddata)
      .then(function (response) {
        if (response.status === 200) {
          self.setState({
            chartRfresh: false
          });
          let females = response.data.data.filter(function (i, n) {
            return i.user.gender == 'female';
          });
          let males = response.data.data.filter(function (i, n) {
            return i.user.gender == 'male';
          });
          let pieData = [
            { title: 'Male', value: parseInt((males.length / response.data.data.length) * 100), color: '#6AB6ED' },
            { title: 'Female', value: parseInt((females.length / response.data.data.length) * 100), color: '#FF568C' },
          ];
          self.setState({
            totalUsers: response.data.data.length,
            totalMale: males.length,
            totalFemale: females.length,
            pieData
          });

          let finalData = response.data.data.filter(function (i, n) {
            return i.rested == type;
          });

          const groups = finalData.reduce((groups, game) => {
            let date = game.createdAt.split('T')[0];
            date = moment(date).format("DD MMM");
            if (!groups[date]) {
              groups[date] = [];
            }
            groups[date].push(game);
            return groups;
          }, {});

          const groupArrays = Object.keys(groups).map((date) => {
            date = moment(date).format("DD MMM");
            return [
              date,
              groups[date].length
            ];
          });
          let chartData = [];
          let chartObj = {};
          chartObj['label'] = self.state.moodList[self.state.activeMoodIndex].shortTitle;
          chartObj['data'] = groupArrays;
          chartData.push(chartObj);
          self.setState({
            chartData,
            chartRfresh: true
          });
        }
      })
      .catch(function (error) {

      });
  }
  render() {
    return (
      <div style={{ backgroundColor: "#FFFFFF", padding: 20, borderRadius: 20 }}>
        <div className="row">
          <div className="col-md-7">
            <span>Indicator Overview</span>
          </div>
          <div className="col-md-5 text-center">
            <span onClick={() => { this.setState({ day_filter: "7_days" }); this.filterByDepartment(); }} style={{ cursor: "pointer", textAlign: "center", marginBottom: 5, fontSize: 10, color: this.state.day_filter === "7_days" ? "#FFFFFF" : "#7648ff", backgroundColor: this.state.day_filter === "7_days" ? "#7648ff" : "#7648ff29", padding: "6px 12px", borderRadius: 5, marginLeft: 5, marginRight: 5 }}>7 days</span>
            <span onClick={() => { this.setState({ day_filter: "14_days" }); this.filterByDepartment(); }} style={{ cursor: "pointer", textAlign: "center", marginBottom: 5, fontSize: 10, color: this.state.day_filter === "14_days" ? "#FFFFFF" : "#7648ff", backgroundColor: this.state.day_filter === "14_days" ? "#7648ff" : "#7648ff29", padding: "6px 12px", borderRadius: 5, marginLeft: 5, marginRight: 5 }}>14 days</span>
            <span onClick={() => { this.setState({ day_filter: "30_days" }); this.filterByDepartment(); }} style={{ cursor: "pointer", textAlign: "center", marginBottom: 5, fontSize: 10, color: this.state.day_filter === "30_days" ? "#FFFFFF" : "#7648ff", backgroundColor: this.state.day_filter === "30_days" ? "#7648ff" : "#7648ff29", padding: "6px 12px", borderRadius: 5, marginLeft: 5, marginRight: 5 }}>1 month</span>
          </div>
        </div>
        <div style={{ marginTop: 15 }}>
          <div style={{ whiteSpace: "nowrap", overflowX: "auto", marginBottom: 10 }}>
            {
              this.state.moodList.map((item, index) =>
                <div key={index} onClick={() => { this.setState({ activeMoodIndex: index }); this.filterByDepartment(); }} className="text-center" style={{ padding: 5, cursor: "pointer", width: 75, marginLeft: 10, marginRight: 10, display: "inline-block" }}>
                  <div className="card" style={{ marginBottom: 5 }}>
                    <div className="card-body text-center" style={{ padding: 5, height: 50, backgroundColor: this.state.activeMoodIndex === index ? "#65bddf" : "#FFFFFF" }}>
                      <img src={item.image} className="img-fluid" style={{ height: 40 }} />
                    </div>
                  </div>
                  <span style={{ fontSize: 10 }}>{item.shortTitle}</span>
                </div>
              )
            }
          </div>
        </div>
        <div style={{ marginTop: 0 }}>
          {
            this.state.activeMoodIndex === 0 &&
            <div className="row">
              <div className="col-md-6" style={{ padding: "0" }}>
                <div style={{ backgroundColor: "#4CB5D810", padding: 15, borderRadius: 20 }}>
                  <span style={{ fontSize: 14 }}>{this.state.chartTitle}</span>
                  <div>
                    {/*Bar Chart Goes Here*/}
                    {
                      this.state.chartRfresh &&
                      <div
                        style={{
                          width: '100%',
                          height: '216px',
                          marginTop: 10
                        }}
                      >
                        <Chart data={this.state.chartData} series={SERIES} axes={this.state.axis} tooltip />
                      </div>
                    }
                  </div>
                </div>
              </div>
              <div className="col-md-2" style={{ textAlign: "-webkit-center", padding: "0" }}>
                {
                  this.state.verticleFeeling.map((item, index) =>
                    <div style={{ cursor: "pointer", width: "75px", marginBottom: "15px", marginTop: "15px" }} onClick={this.filterVerticleMood.bind(this, index)} className="card" key={index}>
                      <div className="card-body text-center" style={{ padding: "3px", zIndex: 0 }}>
                        <img src={item.image} style={{ height: 40 }} />
                        <span style={{ color: item.color, display: "block", fontSize: 12, textAlign: "center" }}>{item.name}</span>
                      </div>
                    </div>
                  )
                }
              </div>
              <div className="col-md-4" style={{ padding: "0" }}>
                <div style={{ backgroundColor: "#95A1B210", padding: 10, borderRadius: 20 }}>
                  <span style={{ fontSize: 14 }}>Gender Ratio</span>
                  <div className="row" style={{ marginTop: 10 }}>
                    <div className="col-md-8">
                      <table style={{ fontSize: 14 }} className="table table-borderless">
                        <tbody>
                          <tr>
                            <td style={{ padding: "0" }}>Total Users</td>
                            <td style={{ fontWeight: "bold", padding: 0 }}><b>{this.state.totalUsers}</b></td>
                          </tr>
                          <tr>
                            <td style={{ padding: 0, color: "#2E9BE8" }}><i style={{ color: "#2E9BE8" }} className="fas fa-male"></i> Male</td>
                            <td style={{ fontWeight: "bold", padding: 0 }}><b>{this.state.totalMale}</b></td>
                          </tr>
                          <tr>
                            <td style={{ padding: 0, color: "#F36693" }}><i style={{ color: "#F36693" }} className="fas fa-female"></i> Female</td>
                            <td style={{ fontWeight: "bold", padding: 0 }}><b>{this.state.totalFemale}</b></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="col-md-4">
                      {/*Circle Chart Goes Here*/}
                      <PieChart
                        data={this.state.pieData}
                        label={({ dataEntry }) => `${dataEntry.value}%`}
                        labelStyle={(index) => ({
                          fill: "#FFFFFF",
                          fontSize: '10px',
                          fontFamily: 'sans-serif',
                        })}
                      />
                    </div>
                  </div>
                </div>
                <div style={{ backgroundColor: "#95A1B210", padding: 10, borderRadius: 20, marginTop: 10 }}>
                  <span style={{ fontSize: 14 }}>Age Groups</span>
                  <div className="row" style={{ marginTop: 10 }}>
                    <div className="col-md-12">
                      <table style={{ fontSize: 14 }} className="table table-borderless">
                        <tbody>
                          <tr>
                            <td style={{ padding: "0" }}>21 - 39 Yrs</td>
                            <td style={{ fontWeight: "bold", width: "70px", padding: "0", textAlign: "center" }}>
                              <div className="progress" style={{ backgroundColor: "#00C58930", height: 6, marginTop: 6, borderRadius: 10 }}>
                                <div className="progress-bar" role="progressbar" style={{ width: "20%", backgroundColor: "#00C589", borderRadius: 10 }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                            </td>
                            <td style={{ fontWeight: "bold", padding: "0", textAlign: "right" }}><b>20%</b></td>
                          </tr>
                          <tr>
                            <td style={{ padding: "0" }} >40 - 59 Yrs</td>
                            <td style={{ fontWeight: "bold", width: "70px", padding: "0", textAlign: "center" }}>
                              <div className="progress" style={{ backgroundColor: "#00C58930", height: 6, marginTop: 6, borderRadius: 10 }}>
                                <div className="progress-bar" role="progressbar" style={{ width: "65%", backgroundColor: "#00C589", borderRadius: 10 }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                            </td>
                            <td style={{ fontWeight: "bold", padding: "0", textAlign: "right" }}><b>65%</b></td>
                          </tr>
                          <tr>
                            <td style={{ padding: "0" }} >60+  Yrs</td>
                            <td style={{ fontWeight: "bold", padding: "0", width: "70px", textAlign: "center" }}>
                              <div className="progress" style={{ backgroundColor: "#00C58930", height: 6, marginTop: 6, borderRadius: 10 }}>
                                <div className="progress-bar" role="progressbar" style={{ width: "15%", backgroundColor: "#00C589", borderRadius: 10 }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                            </td>
                            <td style={{ fontWeight: "bold", padding: "0", textAlign: "right" }}><b>15%</b></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
          {
            this.state.activeMoodIndex === 1 &&
            <div className="row">
              <div className="col-md-8">
                <div style={{ backgroundColor: "#4CB5D810", padding: 15, borderRadius: 20 }}>
                  <span style={{ fontSize: 14 }}>{this.state.chartTitle}</span>
                  <div>
                    {/*Bar Chart Goes Here*/}
                    {
                      this.state.chartRfresh &&
                      <div
                        style={{
                          width: '100%',
                          height: '300px',
                          marginTop: 20
                        }}
                      >
                        <Chart data={this.state.chartData} series={SERIES} axes={this.state.axis} tooltip />
                      </div>
                    }
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div style={{ backgroundColor: "#95A1B210", padding: 15, borderRadius: 20 }}>
                  <span style={{ fontSize: 14 }}>Gender Ratio</span>
                  <div className="row" style={{ marginTop: 10 }}>
                    <div className="col-md-8">
                      <table style={{ fontSize: 14 }} className="table table-borderless">
                        <tbody>
                          <tr>
                            <td >Total Users</td>
                            <td style={{ fontWeight: "bold", padding: 5 }}><b>{this.state.totalUsers}</b></td>
                          </tr>
                          <tr>
                            <td style={{ padding: 5, color: "#2E9BE8" }}><i style={{ color: "#2E9BE8" }} className="fas fa-male"></i> Male</td>
                            <td style={{ fontWeight: "bold", padding: 5 }}><b>{this.state.totalMale}</b></td>
                          </tr>
                          <tr>
                            <td style={{ padding: 5, color: "#F36693" }}><i style={{ color: "#F36693" }} className="fas fa-female"></i> Female</td>
                            <td style={{ fontWeight: "bold", padding: 5 }}><b>{this.state.totalFemale}</b></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="col-md-4">
                      {/*Circle Chart Goes Here*/}
                      <PieChart
                        data={this.state.pieData}
                        label={({ dataEntry }) => `${dataEntry.value}%`}
                        labelStyle={(index) => ({
                          fill: "#FFFFFF",
                          fontSize: '10px',
                          fontFamily: 'sans-serif',
                        })}
                      />
                    </div>
                  </div>
                </div>
                <div style={{ backgroundColor: "#95A1B210", padding: 15, borderRadius: 20, marginTop: 10 }}>
                  <span style={{ fontSize: 14 }}>Age Groups</span>
                  <div className="row" style={{ marginTop: 10 }}>
                    <div className="col-md-12">
                      <table style={{ fontSize: 14 }} className="table table-borderless">
                        <tbody>
                          <tr>
                            <td style={{ padding: "0" }}>21 - 39 Yrs</td>
                            <td style={{ fontWeight: "bold", width: "70px", padding: "0", textAlign: "center" }}>
                              <div className="progress" style={{ backgroundColor: "#00C58930", height: 6, marginTop: 6, borderRadius: 10 }}>
                                <div className="progress-bar" role="progressbar" style={{ width: "20%", backgroundColor: "#00C589", borderRadius: 10 }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                            </td>
                            <td style={{ fontWeight: "bold", padding: "0", textAlign: "right" }}><b>20%</b></td>
                          </tr>
                          <tr>
                            <td style={{ padding: "0" }} >40 - 59 Yrs</td>
                            <td style={{ fontWeight: "bold", width: "70px", padding: "0", textAlign: "center" }}>
                              <div className="progress" style={{ backgroundColor: "#00C58930", height: 6, marginTop: 6, borderRadius: 10 }}>
                                <div className="progress-bar" role="progressbar" style={{ width: "65%", backgroundColor: "#00C589", borderRadius: 10 }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                            </td>
                            <td style={{ fontWeight: "bold", padding: "0", textAlign: "right" }}><b>65%</b></td>
                          </tr>
                          <tr>
                            <td style={{ padding: "0" }} >60+  Yrs</td>
                            <td style={{ fontWeight: "bold", padding: "0", width: "70px", textAlign: "center" }}>
                              <div className="progress" style={{ backgroundColor: "#00C58930", height: 6, marginTop: 6, borderRadius: 10 }}>
                                <div className="progress-bar" role="progressbar" style={{ width: "15%", backgroundColor: "#00C589", borderRadius: 10 }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                            </td>
                            <td style={{ fontWeight: "bold", padding: "0", textAlign: "right" }}><b>15%</b></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
          {
            (this.state.activeMoodIndex === 2) &&
            <div className="row">
              <div className="col-md-6">
                <div style={{ backgroundColor: "#4CB5D810", padding: 15, borderRadius: 20 }}>
                  <span style={{ fontSize: 14 }}>{this.state.chartTitle}</span>
                  <div>
                    {/*Bar Chart Goes Here*/}
                    {
                      this.state.chartRfresh &&
                      <div
                        style={{
                          width: '100%',
                          height: '300px',
                          marginTop: 20
                        }}
                      >
                        <Chart data={this.state.chartData} series={SERIES} axes={this.state.axis} tooltip />
                      </div>
                    }
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <div style={{ cursor: "pointer", width: "75px", margin: "0 auto", marginTop: 15, marginBottom: 15, opacity: this.state.activeRestType === "yep" ? 1 : 0.5 }} onClick={this.filterVerticleRest.bind(this, "yep")} className="card">
                  <div className="card-body text-center" style={{ padding: 5 }}>
                    <div className="circle-traffic"></div>
                    <span style={{ color: "darkgrey", display: "block", fontSize: 10, textAlign: "center" }}>Yes</span>
                  </div>
                </div>
                <div style={{ cursor: "pointer", width: "75px", margin: "0 auto", marginTop: 15, marginBottom: 15, opacity: this.state.activeRestType === "almost" ? 1 : 0.5 }} onClick={this.filterVerticleRest.bind(this, "almost")} className="card">
                  <div className="card-body text-center" style={{ padding: 5 }}>
                    <div className="circle-disturbance"></div>
                    <span style={{ color: "darkgrey", display: "block", fontSize: 10, textAlign: "center" }}>Almost</span>
                  </div>
                </div>
                <div style={{ cursor: "pointer", width: "75px", margin: "0 auto", marginTop: 15, marginBottom: 15, opacity: this.state.activeRestType === "notReady" ? 1 : 0.5 }} onClick={this.filterVerticleRest.bind(this, "notReady")} className="card">
                  <div className="card-body text-center" style={{ padding: 5 }}>
                    <div className="circle-checkwell"></div>
                    <span style={{ color: "darkgrey", display: "block", fontSize: 10, textAlign: "center" }}>Not Really</span>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div style={{ backgroundColor: "#95A1B210", padding: 15, borderRadius: 20 }}>
                  <span style={{ fontSize: 14 }}>Gender Ratio</span>
                  <div className="row" style={{ marginTop: 10 }}>
                    <div className="col-md-8">
                      <table style={{ fontSize: 14 }} className="table table-borderless">
                        <tbody>
                          <tr>
                            <td >Total Users</td>
                            <td style={{ fontWeight: "bold", padding: 5 }}><b>{this.state.totalUsers}</b></td>
                          </tr>
                          <tr>
                            <td style={{ padding: 5, color: "#2E9BE8" }}><i style={{ color: "#2E9BE8" }} className="fas fa-male"></i> Male</td>
                            <td style={{ fontWeight: "bold", padding: 5 }}><b>{this.state.totalMale}</b></td>
                          </tr>
                          <tr>
                            <td style={{ padding: 5, color: "#F36693" }}><i style={{ color: "#F36693" }} className="fas fa-female"></i> Female</td>
                            <td style={{ fontWeight: "bold", padding: 5 }}><b>{this.state.totalFemale}</b></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="col-md-4">
                      {/*Circle Chart Goes Here*/}
                      <PieChart
                        data={this.state.pieData}
                        label={({ dataEntry }) => `${dataEntry.value}%`}
                        labelStyle={(index) => ({
                          fill: "#FFFFFF",
                          fontSize: '10px',
                          fontFamily: 'sans-serif',
                        })}
                      />
                    </div>
                  </div>
                </div>
                <div style={{ backgroundColor: "#95A1B210", padding: 15, borderRadius: 20, marginTop: 10 }}>
                  <span style={{ fontSize: 14 }}>Age Groups</span>
                  <div className="row" style={{ marginTop: 10 }}>
                    <div className="col-md-12">
                      <table style={{ fontSize: 14 }} className="table table-borderless">
                        <tbody>
                          <tr>
                            <td style={{ padding: "0" }}>21 - 39 Yrs</td>
                            <td style={{ fontWeight: "bold", width: "70px", padding: "0", textAlign: "center" }}>
                              <div className="progress" style={{ backgroundColor: "#00C58930", height: 6, marginTop: 6, borderRadius: 10 }}>
                                <div className="progress-bar" role="progressbar" style={{ width: "20%", backgroundColor: "#00C589", borderRadius: 10 }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                            </td>
                            <td style={{ fontWeight: "bold", padding: "0", textAlign: "right" }}><b>20%</b></td>
                          </tr>
                          <tr>
                            <td style={{ padding: "0" }} >40 - 59 Yrs</td>
                            <td style={{ fontWeight: "bold", width: "70px", padding: "0", textAlign: "center" }}>
                              <div className="progress" style={{ backgroundColor: "#00C58930", height: 6, marginTop: 6, borderRadius: 10 }}>
                                <div className="progress-bar" role="progressbar" style={{ width: "65%", backgroundColor: "#00C589", borderRadius: 10 }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                            </td>
                            <td style={{ fontWeight: "bold", padding: "0", textAlign: "right" }}><b>65%</b></td>
                          </tr>
                          <tr>
                            <td style={{ padding: "0" }} >60+  Yrs</td>
                            <td style={{ fontWeight: "bold", padding: "0", width: "70px", textAlign: "center" }}>
                              <div className="progress" style={{ backgroundColor: "#00C58930", height: 6, marginTop: 6, borderRadius: 10 }}>
                                <div className="progress-bar" role="progressbar" style={{ width: "15%", backgroundColor: "#00C589", borderRadius: 10 }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                            </td>
                            <td style={{ fontWeight: "bold", padding: "0", textAlign: "right" }}><b>15%</b></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
          {
            (this.state.activeMoodIndex === 3 || this.state.activeMoodIndex === 4 || this.state.activeMoodIndex === 5 || this.state.activeMoodIndex === 6 || this.state.activeMoodIndex === 7 || this.state.activeMoodIndex === 8 || this.state.activeMoodIndex === 9) &&
            <div className="row">
              <div className="col-md-8">
                <div style={{ backgroundColor: "#4CB5D810", padding: 15, borderRadius: 20 }}>
                  <span style={{ fontSize: 14 }}>{this.state.chartTitle}</span>
                  <div>
                    {/*Bar Chart Goes Here*/}
                    {
                      this.state.chartRfresh &&
                      <div
                        style={{
                          width: '100%',
                          height: '300px',
                          marginTop: 20
                        }}
                      >
                        <Chart data={this.state.chartData} series={SERIES} axes={this.state.axis} tooltip />
                      </div>
                    }
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div style={{ backgroundColor: "#95A1B210", padding: 15, borderRadius: 20 }}>
                  <span style={{ fontSize: 14 }}>Gender Ratio</span>
                  <div className="row" style={{ marginTop: 10 }}>
                    <div className="col-md-8">
                      <table style={{ fontSize: 14 }} className="table table-borderless">
                        <tbody>
                          <tr>
                            <td >Total Users</td>
                            <td style={{ fontWeight: "bold", padding: 5 }}><b>{this.state.totalUsers}</b></td>
                          </tr>
                          <tr>
                            <td style={{ padding: 5, color: "#2E9BE8" }}><i style={{ color: "#2E9BE8" }} className="fas fa-male"></i> Male</td>
                            <td style={{ fontWeight: "bold", padding: 5 }}><b>{this.state.totalMale}</b></td>
                          </tr>
                          <tr>
                            <td style={{ padding: 5, color: "#F36693" }}><i style={{ color: "#F36693" }} className="fas fa-female"></i> Female</td>
                            <td style={{ fontWeight: "bold", padding: 5 }}><b>{this.state.totalFemale}</b></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="col-md-4">
                      {/*Circle Chart Goes Here*/}
                      <PieChart
                        data={this.state.pieData}
                        label={({ dataEntry }) => `${dataEntry.value}%`}
                        labelStyle={(index) => ({
                          fill: "#FFFFFF",
                          fontSize: '10px',
                          fontFamily: 'sans-serif',
                        })}
                      />
                    </div>
                  </div>
                </div>
                <div style={{ backgroundColor: "#95A1B210", padding: 15, borderRadius: 20, marginTop: 10 }}>
                  <span style={{ fontSize: 14 }}>Age Groups</span>
                  <div className="row" style={{ marginTop: 10 }}>
                    <div className="col-md-12">
                      <table style={{ fontSize: 14 }} className="table table-borderless">
                        <tbody>
                          <tr>
                            <td style={{ padding: "0" }}>21 - 39 Yrs</td>
                            <td style={{ fontWeight: "bold", width: "70px", padding: "0", textAlign: "center" }}>
                              <div className="progress" style={{ backgroundColor: "#00C58930", height: 6, marginTop: 6, borderRadius: 10 }}>
                                <div className="progress-bar" role="progressbar" style={{ width: "20%", backgroundColor: "#00C589", borderRadius: 10 }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                            </td>
                            <td style={{ fontWeight: "bold", padding: "0", textAlign: "right" }}><b>20%</b></td>
                          </tr>
                          <tr>
                            <td style={{ padding: "0" }} >40 - 59 Yrs</td>
                            <td style={{ fontWeight: "bold", width: "70px", padding: "0", textAlign: "center" }}>
                              <div className="progress" style={{ backgroundColor: "#00C58930", height: 6, marginTop: 6, borderRadius: 10 }}>
                                <div className="progress-bar" role="progressbar" style={{ width: "65%", backgroundColor: "#00C589", borderRadius: 10 }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                            </td>
                            <td style={{ fontWeight: "bold", padding: "0", textAlign: "right" }}><b>65%</b></td>
                          </tr>
                          <tr>
                            <td style={{ padding: "0" }} >60+  Yrs</td>
                            <td style={{ fontWeight: "bold", padding: "0", width: "70px", textAlign: "center" }}>
                              <div className="progress" style={{ backgroundColor: "#00C58930", height: 6, marginTop: 6, borderRadius: 10 }}>
                                <div className="progress-bar" role="progressbar" style={{ width: "15%", backgroundColor: "#00C589", borderRadius: 10 }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                            </td>
                            <td style={{ fontWeight: "bold", padding: "0", textAlign: "right" }}><b>15%</b></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
          {
            this.state.activeMoodIndex === 10 &&
            <div className="row">
              <div className="col-md-8">
                <div style={{ backgroundColor: "#4CB5D810", padding: 15, borderRadius: 20 }}>
                  <span style={{ fontSize: 14 }}>{this.state.chartTitle}</span>
                  <div className="text-right">
                    <div className="circle-domestic"></div> <span style={{ display: "inline-block", marginLeft: 5, fontSize: 12 }}>Call</span>
                    <div className="circle-burglary" style={{ marginLeft: 10 }}></div> <span style={{ display: "inline-block", marginLeft: 5, fontSize: 12 }}>Text</span>
                  </div>
                  <div>
                    {/*Bar Chart Goes Here*/}
                    {
                      this.state.chartRfresh &&
                      <div
                        style={{
                          width: '100%',
                          height: '300px',
                          marginTop: 20
                        }}
                      >
                        <Chart data={this.state.chartData} series={SERIES} axes={this.state.axis} tooltip />
                      </div>
                    }
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div style={{ backgroundColor: "#95A1B210", padding: 15, borderRadius: 20 }}>
                  <span style={{ fontSize: 14 }}>Gender Ratio</span>
                  <div className="row" style={{ marginTop: 10 }}>
                    <div className="col-md-8">
                      <table style={{ fontSize: 14 }} className="table table-borderless">
                        <tbody>
                          <tr>
                            <td >Total Users</td>
                            <td style={{ fontWeight: "bold", padding: 5 }}><b>{this.state.totalUsers}</b></td>
                          </tr>
                          <tr>
                            <td style={{ padding: 5, color: "#2E9BE8" }}><i style={{ color: "#2E9BE8" }} className="fas fa-male"></i> Male</td>
                            <td style={{ fontWeight: "bold", padding: 5 }}><b>{this.state.totalMale}</b></td>
                          </tr>
                          <tr>
                            <td style={{ padding: 5, color: "#F36693" }}><i style={{ color: "#F36693" }} className="fas fa-female"></i> Female</td>
                            <td style={{ fontWeight: "bold", padding: 5 }}><b>{this.state.totalFemale}</b></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="col-md-4">
                      {/*Circle Chart Goes Here*/}
                      <PieChart
                        data={this.state.pieData}
                        label={({ dataEntry }) => `${dataEntry.value}%`}
                        labelStyle={(index) => ({
                          fill: "#FFFFFF",
                          fontSize: '10px',
                          fontFamily: 'sans-serif',
                        })}
                      />
                    </div>
                  </div>
                </div>
                <div style={{ backgroundColor: "#95A1B210", padding: 15, borderRadius: 20, marginTop: 10 }}>
                  <span style={{ fontSize: 14 }}>Age Groups</span>
                  <div className="row" style={{ marginTop: 10 }}>
                    <div className="col-md-12">
                      <table style={{ fontSize: 14 }} className="table table-borderless">
                        <tbody>
                          <tr>
                            <td style={{ padding: "0" }}>21 - 39 Yrs</td>
                            <td style={{ fontWeight: "bold", width: "70px", padding: "0", textAlign: "center" }}>
                              <div className="progress" style={{ backgroundColor: "#00C58930", height: 6, marginTop: 6, borderRadius: 10 }}>
                                <div className="progress-bar" role="progressbar" style={{ width: "20%", backgroundColor: "#00C589", borderRadius: 10 }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                            </td>
                            <td style={{ fontWeight: "bold", padding: "0", textAlign: "right" }}><b>20%</b></td>
                          </tr>
                          <tr>
                            <td style={{ padding: "0" }} >40 - 59 Yrs</td>
                            <td style={{ fontWeight: "bold", width: "70px", padding: "0", textAlign: "center" }}>
                              <div className="progress" style={{ backgroundColor: "#00C58930", height: 6, marginTop: 6, borderRadius: 10 }}>
                                <div className="progress-bar" role="progressbar" style={{ width: "65%", backgroundColor: "#00C589", borderRadius: 10 }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                            </td>
                            <td style={{ fontWeight: "bold", padding: "0", textAlign: "right" }}><b>65%</b></td>
                          </tr>
                          <tr>
                            <td style={{ padding: "0" }} >60+  Yrs</td>
                            <td style={{ fontWeight: "bold", padding: "0", width: "70px", textAlign: "center" }}>
                              <div className="progress" style={{ backgroundColor: "#00C58930", height: 6, marginTop: 6, borderRadius: 10 }}>
                                <div className="progress-bar" role="progressbar" style={{ width: "15%", backgroundColor: "#00C589", borderRadius: 10 }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                            </td>
                            <td style={{ fontWeight: "bold", padding: "0", textAlign: "right" }}><b>15%</b></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default IndicatorOverView
