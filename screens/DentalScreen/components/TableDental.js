import React, { Component } from 'react';
import { DataTable, Button, Text, Portal, Dialog, Paragraph } from 'react-native-paper';
import { Alert, ScrollView } from 'react-native';
import { shortDates, firebaseDate,completeDay } from './DateFile';
import { db } from '../../../config';
import { setDoc, doc, getFirestore, collection, getDocs, deleteDoc } from 'firebase/firestore';

const optionsPerPage = [2, 3, 4];


const firestore = getFirestore(db);
const asthmaRef = collection(firestore, "Asthma");

export default class TableDental extends Component {
    constructor() {
        super()
        this.state = {
            page: 0,
            itemsPerPage: optionsPerPage[0],
            colors: {
                monday: {
                    slot1: false,
                    slot2: false,
                    slot3: false,
                    slot4: false,
                },
                tuesday: {
                    slot1: false,
                    slot2: false,
                    slot3: false,
                    slot4: false,
                },
                wednesday: {
                    slot1: false,
                    slot2: false,
                    slot3: false,
                    slot4: false,
                },
                thursday: {
                    slot1: false,
                    slot2: false,
                    slot3: false,
                    slot4: false,
                },
                friday: {
                    slot1: false,
                    slot2: false,
                    slot3: false,
                    slot4: false,
                },
                saturday: {
                    slot1: false,
                    slot2: false,
                    slot3: false,
                    slot4: false,
                },
                sunday: {
                    slot1: false,
                    slot2: false,
                    slot3: false,
                    slot4: false,
                },
            },
            count: 0,
            disabled: false,
            data: []
        }
    }


    sendMail = (recipients, subject, body, { patientId = "not given", patientName = " not given" } = {}) => {
        let bodyVal = "This is the sample text that will come along with the appointment data" + body
        let recipientVal = typeof (recipients) == "string" ? [recipients] : recipients;
        console.log("executed")


        var params = {
            name: "sample",
            message: "Your otp is " + "sample",
            email: "adhirajgupta2007@gmail.com"
        }
        fetch('http://127.0.0.1:5000/send/', {
            method: 'POST',
            body: JSON.stringify(params),
            headers: { 'Content-Type': "application/json" }
        }).then(res => {
            console.log(res.json());
        }).catch(err => {
            console.log(err);
        })
    }

    createFirestoreDoc = async (day, slot) => {

        await setDoc(doc(asthmaRef, "patient_name" + Math.round(Math.random() * 1000)), {
            name: "Adhiraj Gupta",
            day: day,
            slot: slot,
            patientId: "Random authentication token"
        });
    }


    getFirestoreData = async () => {
        let list = []
        const querySnapshot = await getDocs(asthmaRef);
        querySnapshot.forEach(async (docs) => {
            console.log(docs.id, " => ", docs.data());
            list.push(docs.data())
        });
        this.setState({
            data: list
        })

        this.isSlotBooked()
    }



    deleteDocs = async () => {
        const querySnapshot = await getDocs(asthmaRef);
        querySnapshot.forEach(async (docs) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            await deleteDoc(doc(firestore, "Asthma", docs.id))
        });

    }

    bookSlot = (day, slot) => {
        return Alert.alert('Confirm Booking', 'This action cannot be reversed', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK', onPress: () => {
                    this.setState({
                        count: this.state.count + 1,
                        disabled: !this.state.disabled,
                        colors: {
                            ...this.state.colors,
                            [day]: {
                                [slot]: !this.state.colors[day][slot]
                            }
                        },
                    })
                    this.createFirestoreDoc(firebaseDate[day], slot)
                }
            },
        ]);

    }

    cal = (x) => {

        const today = new Date()
        let tomorrow = new Date()
        tomorrow.setDate(today.getDate() + x)
        let newDate = tomorrow.toString().split(' ')
        return {
            shortDate: newDate[1] + " " + newDate[2],

        }
    }


    isSlotBooked = () => {  // Red colouring booked slots
        for(let i = 0;i<this.state.data.length;i++){
            console.log(this.state.data[i])
        let dataArray = this.state.data[i].day.split(' ')
        let date = dataArray[0]+ " "+ dataArray[1];
        let day = dataArray[dataArray.length-1];
        let slotNum = this.state.data[i].slot
            this.setState({
                colors:{
                    ...this.state.colors,
                    [completeDay(day)]:{
                        ...this.state.colors[completeDay(day)],
                        [slotNum]:"booked"
                    }
                }
            })
        
        }   
    }


    checkBackgroundcolor = (slotVal, dateVal, slotNum, day) => {
        switch (slotVal) {
            case true:
                return "lightgreen";
            case false:
                return "white"
            case "booked":
                return "white"
        }
    }

    checkDisabledStatus = (slotVal,disabledState) => {
        console.log(slotVal === "booked"?true:disabledState)
        return slotVal === "booked"?true:disabledState
    }

    renderCell = (x, day) => {
        {/* Monday Row */ }
        let shortDates = {
            monday: this.cal(1 + x).shortDate,
            tuesday: this.cal(2 + x).shortDate,
            wednesday: this.cal(3 + x).shortDate,
            thursday: this.cal(4 + x).shortDate,
            friday: this.cal(5 + x).shortDate,
            saturday: this.cal(6 + x).shortDate,
            sunday: this.cal(7 + x).shortDate,
        }

        return <>
            <ScrollView horizontal contentContainerStyle={{}}>
                <DataTable.Row>
                    <DataTable.Cell style={{ borderColor: 'black', borderRightWidth: 1, width: 70 }}>
                        <Text style={{ textAlign: 'center' }}>{shortDates[day]}</Text>
                    </DataTable.Cell>
                    <DataTable.Cell style={{ width: 130 }}>
                        <Button disabled={this.checkDisabledStatus(this.state.colors[day]["slot" + 1],this.state.disabled)} mode="contained" style={{ backgroundColor: this.checkBackgroundcolor(this.state.colors[day]["slot" + 1], shortDates[day], "slot" + 1, day) }}
                            onPress={() => {
                                this.bookSlot(day, "slot" + 1)
                            }}>
                            <Text>4:30 - 5:00</Text>
                        </Button>
                    </DataTable.Cell>
                    <DataTable.Cell style={{ width: 130 }}>
                        <Button disabled={this.checkDisabledStatus(this.state.colors[day]["slot" + 2],this.state.disabled)} mode="contained" style={{ backgroundColor: this.checkBackgroundcolor(this.state.colors[day]["slot" + 2], shortDates[day], "slot" + 2, day) }}
                            onPress={() => {
                                this.bookSlot(day, "slot" + 2)
                            }}>
                            <Text>5:00 - 5:30</Text>
                        </Button>
                    </DataTable.Cell>
                    <DataTable.Cell style={{ width: 130 }}>
                        <Button disabled={this.checkDisabledStatus(this.state.colors[day]["slot" + 3],this.state.disabled)} mode="contained" style={{ backgroundColor: this.checkBackgroundcolor(this.state.colors[day]["slot" + 3], shortDates[day], "slot" + 3, day) }}
                            onPress={() => {
                                this.bookSlot(day, "slot" + 3)
                            }}>
                            <Text>5:00 - 5:30</Text>
                        </Button>
                    </DataTable.Cell>
                </DataTable.Row>
            </ScrollView>
        </>
    }


    componentDidMount() {
        this.getFirestoreData();

    }

    componentDidUpdate() {
        console.log(this.state.colors);
    }

    renderTable = (x) => {
        return <>
            {this.renderCell(x, "monday")}
            {this.renderCell(x, "tuesday")}
            {this.renderCell(x, "wednesday")}
            {this.renderCell(x, "thursday")}
            {this.renderCell(x, "friday")}
            {this.renderCell(x, "saturday")}
            {this.renderCell(x, "sunday")}
        </>
    }


    render() {
        return (
            <DataTable>
                <DataTable.Header style={{ borderBottomWidth: 2, borderBottomColor: 'black' }}>
                    <DataTable.Title style={{ width: 20 }}>Day</DataTable.Title>
                    <DataTable.Title style={{ alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}>Timings</DataTable.Title>
                </DataTable.Header>

                {
                    this.state.page === 0 && (
                        this.renderTable(0)
                    )
                }
                {
                    this.state.page === 1 && (
                        this.renderTable(7)
                    )
                }
                {
                    this.state.page === 2 && (
                        this.renderTable(14)
                    )
                }
                {
                    this.state.page === 3 && (
                        this.renderTable(21)
                    )
                }

                <DataTable.Pagination
                    label={`${this.state.page}/3`}
                    page={this.state.page}
                    numberOfPages={4}
                    onPageChange={(page) => this.setState({ page: page })}
                    optionsPerPage={optionsPerPage}
                    itemsPerPage={this.state.itemsPerPage}
                    // setItemsPerPage={this.setState({ itemsPerPage: setItemsPerPage })}
                    optionsLabel={'Rows per page'}
                    showFastPaginationControls
                />
            </DataTable>
        )
    }
}