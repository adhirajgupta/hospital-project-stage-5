import React, { Component } from 'react';
import { DataTable, Button, Text, Portal, Dialog, Paragraph, ActivityIndicator, } from 'react-native-paper';
import { Alert, ScrollView, View } from 'react-native';
import { shortDates, firebaseDate, completeDay, numToDay } from './DateFile';
import { db } from '../../../config';
import { setDoc, doc, getFirestore, collection, getDocs, deleteDoc, query, where } from 'firebase/firestore';
import { extractBgColor, extractDisabledState, returnState } from './extraFunctions';
import { getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firestore = getFirestore(db);
const entRef = collection(firestore, "ENT");
const usersRef = collection(firestore, "Users");

const auth = getAuth(db)
const optionsPerPage = [1, 2, 3];
let date = new Date();

export default class TableEnt extends Component {

    constructor() {
        super();
        this.state = {
            page: 0,
            itemsPerPage: optionsPerPage[0],
            data: [],   //* Array holding data for patient and slots 
            slots: [],  // *Array holding data for slots,
            cancelledSlots: [],
            bookedSlots: [],
            disabled1: false,
            disabled2: false,
            disabled3: false,
            disabled4: false,
            user: {}

        }
    }

    //! Stores the data of async storage user into state - Can only be used after componentDidMount
    getUserDetails = async () => {
        const jsonValue = await AsyncStorage.getItem('userDetails')
        let user = jsonValue != null ? JSON.parse(jsonValue) : null;

        console.log("getUSerDEtails function ", user)
        this.setState({
            user: user
        })
        // console.log(this.state.user.emailId)

        // console.log("user details async storage", storage)
        return user

    }

    //! Gets all the docs in the firebase
    getFirestoreData = async () => {
        let list = []
        const querySnapshot = await getDocs(entRef);
        querySnapshot.forEach(async (docs) => {
            // console.log(docs.id, " => ", docs.data());
            list.push(docs.data())
        });
        this.setState({
            data: list
        })
    }

    //! only gets the slots data and filters
    // TODO Check if the name of the logged in user matches the slot
    getFirestoreBookedSlots = async () => {
        
        const jsonValue = await AsyncStorage.getItem('userDetails')
        let user = jsonValue != null ? JSON.parse(jsonValue) : null;
        let list = []
        const q = query(entRef, where("type", "==", "bookedSlot"), where("patientId", "==", user.emailId))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            list.push(doc.data())
        });
        // console.log(list)


        // let tList = [...this.state.bookedSlots, ...list];


        this.setState({
            bookedSlots: list
        })
    }

    //! Gets only the cancelled firebase slots
    getFirestoreCancelledSlots = async () => {
        //* Querying all the canceled slots
        let tList = []
        let csList = []
        const cs = query(entRef, where("type", "==", "cancelSlot"),)
        const qs = await getDocs(cs);
        qs.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            csList.push(doc.data());
        });
        tList = [...tList, ...csList]
        // console.log("tList of cancelled slots " + tList)
        this.setState({
            cancelledSlots: tList
        })
    }

    //! calculates the dates to be displayed in the day column in the table
    cal = (x) => {
        const today = new Date()
        let tomorrow = new Date()
        tomorrow.setDate(today.getDate() + x)
        let newDate = tomorrow.toString().split(' ')
        return {
            shortDate: newDate[1] + " " + newDate[2],

        }
    }

    //! Only gets the slots data
    getFirestoreSlots = async (day, index) => {
        let list = []
        const q = query(entRef, where("type", "==", "slot"), where("day", "==", day))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            list.push(doc.data())
        });
        // * The ...this.state.bookedSlots keeps the previous data in the state as the list contains only the specific day
        let tList = [...this.state.slots, ...list];


        this.setState({
            slots: tList
        })
    }


    deleteDocs = async () => {
        const q = query(entRef, where("doctorId", "==", "Random authentication token"))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (docs) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            await deleteDoc(doc(firestore, "ENT", docs.id))
        });

    }

    //! Creates a firestore document for every slot cancelled
    // TODO Put logged in users details
    disableSlotByDoctor = async (day, slot, id, date) => {
        await setDoc(doc(entRef, "doctor_name" + Math.round(Math.random() * 1000)), {
            name: "Doctors name",
            day: day,
            slot: slot,
            doctorId: "Random authentication token",
            id: id,
            date: date,
            type: "cancelSlot"
        });

        let tempcancelledslot = {
            name: "Doctors name",
            day: day,
            slot: slot,
            doctorId: "Random authentication token",
            id: id,
            date: date,
            type: "cancelSlot"
        }
        this.setState({
            cancelledSlots: [...this.state.cancelledSlots, tempcancelledslot]
        })

    }

    //! Creates a firestore document for every slot booked
    //TODO make sure it creates the document name with the logged in user
    // TODO user is undefined
    createFirestoreDoc = async (day, slot, id, date) => {
        console.log("while creating firestore doc",this.state.user)
        await setDoc(doc(entRef, this.state.user.emailId + Math.round(Math.random() * 1000)), {
            name: this.state.user.name,
            day: day,
            slot: slot,
            patientId: this.state.user.emailId,
            id: id,
            date: date,
            type: "bookedSlot"
        });
        let tempbookedslotobj = {
            name: this.state.user.name,
            day: day,
            slot: slot,
            patientId: this.state.user.emailId,
            id: id,
            date: date,
            type: "bookedSlot"
        }
        this.setState({
            bookedSlots: [...this.state.bookedSlots, tempbookedslotobj]
        })
        // this.checkBackgroundColor(date, day, id, slot)
    }

    //! show the alert pop up to book slot and call respective function for both doctor and patient sides
    bookSlot = (day, slot, id, date) => {

        // * To check if the user is a doctor or not || There will be more mails to check for later
        // TODO Change the if condition: for the logged in user (auth.currentUser.email) or something else to match any one doctor's emails  
        if (this.state.user.emailId == "sahuexp@gmail.com") {
            // console.log(auth.currentUser.email)                            //* This data is got by the last logged in user by firebase or async 
            //* Gives doctors the privellige to cancels slots while the regular users cant
            return Alert.alert('Cancel Slot', 'Do you want to cancel the availabilty of this slot', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('day', day, '\n', "slot", slot, "date - ", date),
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => {
                        //* Turns slots background color red
                        this.disableSlotByDoctor(day, slot, id, date)
                    }
                }
            ])
        } else
            return Alert.alert('Confirm Booking', 'This action cannot be reversed', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('day', day, '\n', "slot", slot, "date - ", date),
                    style: 'cancel',
                },
                {
                    text: 'OK', onPress: () => {
                        //* Turns slots background color green
                        this.createFirestoreDoc(day, slot, id, date)
                        this.setState({
                            //* Depeneding on the page no. the week is disabled
                            [returnState(this.state.page)]: true
                        })
                    }
                }
            ])
    }


    checkBackgroundColor = (date, day, id, slot) => {
        //! ExtractBgColor checks whether the multiple values returned (since it is an array) has a single red or green then gives the background colour
        let c1 = extractBgColor(this.state.bookedSlots.map(el => {
            //! Compares the values from the booked slots and the EXACT SLOT rendered
            if (el.date == date && el.day == day && el.id == id && el.slot == slot) {
                return "lightgreen"
            }
        }))

        let c2 = extractBgColor(this.state.cancelledSlots.map(el => {
            //! Compares the values from the cancelled slots and the EXACT SLOT rendered
            if (el.date == date && el.day == day && el.id == id && el.slot == slot) {
                return "red"
            }
        }))

        //* Supersedes the cancelled slot over the booked slot
        return c2 === "red" ? c2 : c1
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
                                        <Button disabled={(disabled)} mode="outlined" style={{ backgroundColor: this.checkBackgroundColor(shortDates[row], arr.day, arr.id, arr.slot) }}
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
        // the date mentioned here is initialized outside the class
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
        this.getUserDetails()
        this.getFirestoreSlots("monday")
        this.getFirestoreSlots("tuesday")
        this.getFirestoreSlots("wednesday")
        this.getFirestoreSlots("thursday")
        this.getFirestoreSlots("friday")
        this.getFirestoreSlots("saturday")
        this.getFirestoreSlots("sunday")

        this.getFirestoreData()
        this.getFirestoreBookedSlots()
        this.getFirestoreCancelledSlots()

    }

    componentDidUpdate() {
        // console.log(this.state.page)
    }

    render() {
        return (
            <DataTable>
                <DataTable.Header style={{ borderBottomWidth: 2, borderBottomColor: 'black' }}>
                    <DataTable.Title style={{ width: 20 }}>Day</DataTable.Title>
                    <DataTable.Title style={{ alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}>Timings</DataTable.Title>
                </DataTable.Header>
                {
                    this.state.slots.length > 0 ? (
                        this.state.page === 0 && (
                            this.renderTable(0, this.state.disabled1)
                        )
                    ) : (
                        <ActivityIndicator />
                    )
                }
                {
                    // ! Renders week worth of table
                    this.state.page === 1 && (
                        //! Render Table indiviually renders each days row
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
