import React, { Component } from 'react';
import { DataTable, Button, Text, Portal, Dialog, Paragraph, } from 'react-native-paper';
import { Alert, ScrollView, View } from 'react-native';
import { shortDates, firebaseDate, completeDay, numToDay } from './DateFile';
import { db } from '../../../config';
import { setDoc, doc, getFirestore, collection, getDocs, deleteDoc, query, where } from 'firebase/firestore';
import { extractBgColor } from './extraFunctions';


const firestore = getFirestore(db);
const entRef = collection(firestore, "ENT");
const optionsPerPage = [1, 2, 3];
let date = new Date();


export default class TableEnt extends Component {

    constructor() {
        super();
        this.state = {
            page: 0,
            itemsPerPage: optionsPerPage[0],
            data: [],   // Array holding data for patient and slots 
            slots: [],  // Array holding data for slots
            bookedSlots: [],
            disabled1: false,
            disabled2: false,
            disabled3: false,
            disabled4: false,

            colors: {
                week1: {
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
                }
            }
        }
    }

    getFirestoreData = async () => {        // Gets all the docs in the firebase
        let list = []
        const querySnapshot = await getDocs(entRef);
        querySnapshot.forEach(async (docs) => {
            console.log(docs.id, " => ", docs.data());
            list.push(docs.data())
        });
        this.setState({
            data: list
        })

    }

    getFirestoreBookedSlots = async (day, index) => {     // only gets the slots data
        let list = []
        const q = query(entRef, where("type", "==", "bookedSlot"))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            list.push(doc.data())
        });
        console.log(list)
        let tList = [...this.state.bookedSlots, ...list];


        this.setState({
            bookedSlots: tList     // only the last data is in list 
        })
    }


    cal = (x) => {  // calculates the dates to be displayed in the day column in the table
        const today = new Date()
        let tomorrow = new Date()
        tomorrow.setDate(today.getDate() + x)
        let newDate = tomorrow.toString().split(' ')
        return {
            shortDate: newDate[1] + " " + newDate[2],

        }
    }


    getFirestoreSlots = async (day, index) => {     // only gets the slots data
        let list = []
        const q = query(entRef, where("type", "==", "slot"), where("day", "==", day))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            list.push(doc.data())
        });
        console.log(list)
        let tList = [...this.state.slots, ...list];


        this.setState({
            slots: tList     // only the last data is in list 
        })
    }


    deleteDocs = async () => {
        const q = query(entRef, where("patientId", "==", "Random authentication token"))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (docs) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            await deleteDoc(doc(firestore, "ENT", docs.id))
        });

    }

    createFirestoreDoc = async (day, slot, id, date) => {      // Cretaes a firestore document for every slot booked

        await setDoc(doc(entRef, "patient_name" + Math.round(Math.random() * 1000)), {
            name: "Adhiraj Gupta",
            day: day,
            slot: slot,
            patientId: "Random authentication token",
            id: id,
            date: date,
            type: "bookedSlot"
        });
        let tempbookedslotobj = {
            name: "Adhiraj Gupta",
            day: day,
            slot: slot,
            patientId: "Random authentication token",
            id: id,
            date: date,
            type: "bookedSlot"
        }
        this.setState({
            bookedSlots: [...this.state.bookedSlots, tempbookedslotobj]
        })
        this.checkBackgroundColor(date, day, id, slot)
    }

    bookSlot = (day, slot, id, date) => {      // show the alert pop up to book slot

        return Alert.alert('Confirm Booking', 'This action cannot be reversed', [
            {
                text: 'Cancel',
                onPress: () => console.log('day', day, '\n', "slot", slot, "date - ", date),
                style: 'cancel',
            },
            {
                text: 'OK', onPress: () => {
                    this.createFirestoreDoc(day, slot, id, date)
                    switch (this.state.page) {
                        case 0:
                            this.setState({
                                disabled1: true
                            })
                        case 1:
                            this.setState({
                                disabled2: true
                            })
                        case 2:
                            this.setState({
                                disabled3: true
                            })

                        case 3:
                            this.setState({
                                disabled4: true
                            })
                    }
                }
            }
        ])
    }


    checkBackgroundColor = (date, day, id, slot) => {
        return extractBgColor(this.state.bookedSlots.map(el => {
            console.log("date", el.date, date)
            console.log("day", el.day, day)
            console.log("id", el.id, id)
            console.log("slot", el.slot, slot)


            if (el.date == date && el.day == day && el.id == id && el.slot == slot) {

                return "lightgreen"
            } else {

                return "red"
            }
        }))
    }



    renderCell = (x, day, row, disabled) => {  // Displays each row in the table

        let shortDates = {      // Remains Constant - Left Date column data
            row1: this.cal(1 + x).shortDate,
            row2: this.cal(2 + x).shortDate,
            row3: this.cal(3 + x).shortDate,
            row4: this.cal(4 + x).shortDate,
            row5: this.cal(5 + x).shortDate,
            row6: this.cal(6 + x).shortDate,
            row7: this.cal(7 + x).shortDate,
        }
        return <>
            <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                <View>
                    <DataTable.Cell style={{ borderColor: 'black', borderRightWidth: 1, width: 70, marginLeft: 10 }}>
                        <Text style={{ textAlign: 'center' }}>{shortDates[row]}</Text>
                    </DataTable.Cell>
                </View>
                <ScrollView horizontal contentContainerStyle={{ marginLeft: -10 }}>
                    <DataTable.Row>
                        {
                            this.state.slots.map((arr) => { // Loops through the slot data
                                return arr.day === day && ( // if the day in the array matches which row it is rendering - found at by argument passed

                                    <DataTable.Cell style={{ width: 130 }}>
                                        <Button disabled={disabled} mode="contained" style={{ backgroundColor: this.checkBackgroundColor(shortDates[row], arr.day, arr.id, arr.slot) }}
                                            onPress={() => {
                                                this.bookSlot(day, arr.slot, arr.id, shortDates[row])
                                            }}>
                                            <Text>{arr.time}</Text>
                                        </Button>
                                    </DataTable.Cell>

                                )
                            })
                        }
                    </DataTable.Row>
                </ScrollView>
            </View>
        </>
    }



    renderTable = (x, disabled) => {
        return <>
            {this.renderCell(x, numToDay(date.getDay() + 1), "row1", disabled)}
            {this.renderCell(x, numToDay(date.getDay() + 2), "row2", disabled)}
            {this.renderCell(x, numToDay(date.getDay() + 3), "row3", disabled)}
            {this.renderCell(x, numToDay(date.getDay() + 4), "row4", disabled)}
            {this.renderCell(x, numToDay(date.getDay() + 5), "row5", disabled)}
            {this.renderCell(x, numToDay(date.getDay() + 6), "row6", disabled)}
            {this.renderCell(x, numToDay(date.getDay() + 7), "row7", disabled)}
        </>
    }

    componentDidMount() {
        this.getFirestoreSlots("monday")
        this.getFirestoreSlots("tuesday")
        this.getFirestoreSlots("wednesday")
        this.getFirestoreSlots("thursday")
        this.getFirestoreSlots("friday")
        this.getFirestoreSlots("saturday")
        this.getFirestoreSlots("sunday")

        this.getFirestoreData()
        this.getFirestoreBookedSlots("monday")
    }

    componentDidUpdate() {
        console.log(this.state.page)
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
                        this.renderTable(0, this.state.disabled1)
                    )
                }
                {
                    this.state.page === 1 && (
                        this.renderTable(7, this.state.disabled2)
                    )
                }
                {
                    this.state.page === 2 && (
                        this.renderTable(14, this.state.disabled3)
                    )
                }
                {
                    this.state.page === 3 && (
                        this.renderTable(21, this.state.disabled4)
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
