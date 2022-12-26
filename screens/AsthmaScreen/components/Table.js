import React, { Component } from 'react';
import { DataTable, Button, Text, Portal, Dialog, Paragraph } from 'react-native-paper';
import { Alert, ScrollView } from 'react-native';
import { shortDates, firebaseDate, completeDay } from './DateFile';
import { db } from '../../../config';
import { setDoc, doc, getFirestore, collection, getDocs, deleteDoc, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { async } from '@firebase/util';
import { View } from 'react-native-animatable';

const optionsPerPage = [2, 3, 4];


const firestore = getFirestore(db);
const asthmaRef = collection(firestore, "Asthma");

const auth = getAuth(db)

export default class TableComponent extends Component {
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


    sendMail = () => {

        var params = {
            name: "sample",
            message: "Your otp is " + "sample",
            email: "adhirajgupta2007@gmail.com"
        }
        fetch('http://127.0.0.1:5000/send', {
            method: 'POST',
            body: JSON.stringify(params),
            headers: { 'Content-Type': "application/json" }
        }).then(res => {
            console.log(res.json());
        }).catch(err => {
            console.log(err);
        })
    }

    // Creates firestore document for every slot booked in the asthma section
    createFirestoreDoc = async (day, slot) => {
        await setDoc(doc(asthmaRef, "patient_name" + Math.round(Math.random() * 1000)), {
            name: "Adhiraj Gupta",          // Using sample name for now
            day: day,
            slot: slot,
            patientId: "Random authentication token"    // for user identification
        });
        this.sendMail()     // Not working yet due to Network request failed
    }

    // Gets all the documents in the asthma collection of the firebase
    getFirestoreData = async () => {
        let list = []
        const querySnapshot = await getDocs(asthmaRef);
        querySnapshot.forEach(async (docs) => {
            console.log(docs.id, " => ", docs.data()); 1
            list.push(docs.data())
        });
        this.setState({     // Setting the received data in the state
            data: list
        })

        this.isSlotBooked() // To check which slot is booked or not and make them red
    }

    // Red colouring booked slots
    isSlotBooked = () => {
        for (let i = 0; i < this.state.data.length; i++) {  // Looping through every index of the data (firestore documents)
            console.log(this.state.data[i])
            let dataArray = this.state.data[i].day.split(' ')
            let date = dataArray[0] + " " + dataArray[1];
            let day = dataArray[dataArray.length - 1];      // Getting the exact day name like Mon
            let slotNum = this.state.data[i].slot   // Getting if it is slot1 or slot 2 or slot 3 in that manner

            this.setState({
                colors: {
                    ...this.state.colors,   // so that the previous states data is not lost
                    // Entering the exact day
                    [completeDay(day)]: {           // Complete day function just changes Mon to monday or Tue to tuesday
                        ...this.state.colors[completeDay(day)], //  so that the previous states data is not lost ( the slot and their values: true/false/booked)
                        [slotNum]: "booked"
                    }
                }
            })

        }
    }
    // Resetting the asthma collection with no data
    deleteDocs = async () => {
        const querySnapshot = await getDocs(asthmaRef);
        querySnapshot.forEach(async (docs) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            await deleteDoc(doc(firestore, "Asthma", docs.id))
        });

    }

    cancelSlotFirebase = async (day, slot) => {
        console.log(day, slot)
        const q = query(asthmaRef, where("day", "==", day), where("slot", "==", slot))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
        await setDoc(doc(asthmaRef, "patient_name" + Math.round(Math.random() * 1000)), {
            name: "Adhiraj Gupta",
            day: day,
            slot: slot,
            patientId: "Random authentication token",
            status: "cancelled"
        });
    }

    // If a user wants to book a slot then this function is called
    bookSlot = (day, slot) => {
        // if (auth.currentUser.email == "adhirajgupta2007@gmail.com") {   // To check if the user is a doctor or not || There will be more mails to check for later
            // console.log(auth.currentUser.email)                            // This data is got by the last logged in user by firebase or async storage
         /*   return Alert.alert('Cancel Slot', 'Do you want to cancel the availabilty of this slot', [   // Gives doctors the privellige to cancels slots while the regular users cant
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
                                    [slot]: "booked"
                                }
                            },
                        })
                        this.cancelSlotFirebase(firebaseDate[day], slot)        // Cancelling the specified slot
                    }
                },
            ]); */
        
        // else {        // If the user is not a doctor then he has to be patient
            return Alert.alert('Confirm Booking', 'This action cannot be reversed', [   // Cancelling the slot privellige IS NOT THERE
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
                        this.createFirestoreDoc(firebaseDate[day], slot)        // Creating the firestore doc for the specified slot 
                    }
                },
            ]);
        }
    


    checkBackgroundcolor = (slotVal, dateVal, slotNum, day) => {

        switch (slotVal) {
            case true:
                return "lightgreen";
            case false:
                return "white"
            case "booked":
                return "red"
        }
    }

    checkDisabledStatus = (slotVal, disabledState) => {
        console.log(slotVal === "booked" ? true : disabledState)
        // if (auth.currentUser.email == "adhirajgupta2007@gmail.com") {
        //     return false;
        // } else 
        {
            return slotVal === "booked" ? true : disabledState
        }
    }

    // To calculate the date for the next days based on x
    cal = (x) => {
        const today = new Date()
        let tomorrow = new Date()
        tomorrow.setDate(today.getDate() + x)
        let newDate = tomorrow.toString().split(' ')
        return {
            shortDate: newDate[1] + " " + newDate[2],

        }
    }

    // Returns an entire row with the ui of the table with the accurate dates calulated using cal
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
            {/* Horizontal scroll view for multiple slots */}
            <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                <View>
                    <DataTable.Cell style={{ borderColor: 'black', borderRightWidth: 1, width: 70, marginLeft: 10 }}>
                        <Text style={{ textAlign: 'center' }}>{shortDates[day]}</Text>
                    </DataTable.Cell>
                </View>
                {/* 
                    <DataTable.Cell style={{ borderColor: 'black', borderRightWidth: 1, width: 70,marginLeft:120 }}>
                        <Text style={{ textAlign: 'center' }}>{shortDates[day]}</Text>
                    </DataTable.Cell> */}
                <ScrollView horizontal contentContainerStyle={{ marginLeft: -10 }}>
                    <DataTable.Row>

                        <DataTable.Cell style={{ width: 130 }}>
                            <Button disabled={this.checkDisabledStatus(this.state.colors[day]["slot" + 1], this.state.disabled)} mode="outlined" style={{ backgroundColor: this.checkBackgroundcolor(this.state.colors[day]["slot" + 1], shortDates[day], "slot" + 1, day) }}
                                onPress={() => {
                                    this.bookSlot(day, "slot" + 1)
                                }}>
                                <Text>4:30 - 5:00</Text>
                            </Button>
                        </DataTable.Cell>
                        <DataTable.Cell style={{ width: 130 }}>
                            <Button disabled={this.checkDisabledStatus(this.state.colors[day]["slot" + 2], this.state.disabled)} mode="outlined" style={{ backgroundColor: this.checkBackgroundcolor(this.state.colors[day]["slot" + 2], shortDates[day], "slot" + 2, day) }}
                                onPress={() => {
                                    this.bookSlot(day, "slot" + 2)
                                }}>
                                <Text>5:00 - 5:30</Text>
                            </Button>
                        </DataTable.Cell>
                        <DataTable.Cell style={{ width: 130 }}>
                            <Button disabled={this.checkDisabledStatus(this.state.colors[day]["slot" + 3], this.state.disabled)} mode="outlined" style={{ backgroundColor: this.checkBackgroundcolor(this.state.colors[day]["slot" + 3], shortDates[day], "slot" + 3, day) }}
                                onPress={() => {
                                    this.bookSlot(day, "slot" + 3)
                                }}>
                                <Text>5:00 - 5:30</Text>
                            </Button>
                        </DataTable.Cell>
                    </DataTable.Row>
                </ScrollView>
            </View>
        </>
    }


    componentDidMount = async () => {
        this.getFirestoreData()

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