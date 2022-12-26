import React, { Component } from 'react';
import { Dimensions, View, StyleSheet, KeyboardAvoidingView, } from 'react-native'
import { Searchbar, List, ActivityIndicator, Button, Text, Snackbar, Portal, Modal, Headline, TextInput, RadioButton, } from 'react-native-paper';
import AppBar from '../../globalComponents/AppBar';
import { searchFunction } from './components/dataSet';
import { ScrollView } from 'react-native-gesture-handler';
import { doc, updateDoc, arrayUnion, arrayRemove, getFirestore, getDoc } from "firebase/firestore";
import db from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { async } from '@firebase/util';

// import { tpaList, insuranceCompanyList, otherCompanyList} from './components/dataSet'

const firestore = getFirestore(db);

const textDataref = doc(firestore, "TextData", "Affiliations");



const { width, height } = Dimensions.get('screen')

class Affiliations extends Component {
    constructor() {
        super()
        this.state = {
            searchQuery: '',
            lists: [],
            user: {},
            editing: false,
            visible: false,
            modal: false,
            modalInput: '',
            modalList: ''
        }
    }

    //! Uploads the initial list to the firestore by updating not creating
    //? arrayUnion adds data to array ; arrayRemove removes data from array
    createFirestore = async () => {
        await updateDoc(textDataref, {
            otherCompany: arrayUnion(...otherCompanyList),
            insuranceCompany: arrayUnion(...insuranceCompanyList)
        });

    }



    //! Changes state when text is changed 
    onChangeSearch = (text) => {
        this.setState({
            searchQuery: text
        })

    }

    //! Gets tpa insurance and oher company lists from firebase
    getListsFromFirebase = async () => {
        let val = await getDoc(textDataref)
        // console.log(val.data())
        this.setState({
            lists: val.data()
        })
    }

    //! Gets login data from async storage
    getAsyncStorageData = async () => {
        const jsonValue = await AsyncStorage.getItem('userDetails')
        let val = jsonValue != null ? JSON.parse(jsonValue) : null;
        this.setState({
            user: val
        })
    }

    //! When they want to add an affiliation this function is called
    addAffiliationToFirestore = async(list,element) => {
        if(list && element){

          await updateDoc(textDataref, {
            [list]: arrayUnion(element)
        })
        this.forceUpdate(this.componentDidMount())
        }

    }  

    //! When edit data button is pressed this button is fixed
    renderModal = () => {
        return <Portal>
            <Modal visible={this.state.modal}
                onDismiss={() => this.setState({ modal: false })}
                contentContainerStyle={{ backgroundColor: 'white', padding: 20, flex: 0.5, width: width - 20, margin: 10 }}>
                {/* <KeyboardAvoidingView> */}

                    <View style={{ flex: 0.4, alignItems: 'center' }}>
                        <Headline style={{ fontSize: 18 }}>ADD A NEW AFFILIATION TO THIS LIST</Headline>
                        <TextInput
                            label="Affiliation name"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => this.setState({ modalInput: val })}
                            mode="flat"
                            focusable
                        />
                    </View>
                    <View style={{ flex: 0.6, margin: 20, justifyContent: 'space-evenly' }}>
                        <RadioButton.Group onValueChange={newValue => this.setState({ modalList: newValue })} value={this.state.modalList} >
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <RadioButton value="tpa" />
                                <Text style={{ fontSize: 15, marginTop: 5 }}>TPA list</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <RadioButton value="insuranceCompany" />
                                <Text style={{ fontSize: 15, marginTop: 5 }}>INSURANCE COMPANY list</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <RadioButton value="otherCompany" />
                                <Text style={{ fontSize: 15, marginTop: 5 }}>OTHER COMPANY list</Text>
                            </View>
                        </RadioButton.Group>
                    </View>
                    <Button
                        mode='text'
                        style={{ justifyContent: 'flex-end' }}
                        labelStyle={{ fontSize: 18 }}
                        onPress={() => {
                            this.addAffiliationToFirestore(this.state.modalList,this.state.modalInput)
                            this.setState({
                                modal:false
                            })
                        }}
                    >
                        <Text>Ok</Text>
                    </Button>
                {/* </KeyboardAvoidingView> */}
            </Modal>
        </Portal>
    }

    // TODO Put snackbar for undo or confirm button
    //! When delete icon is pressed this is called
    removeElementFromFirestoreList = async (list, element) => {

        await updateDoc(textDataref, {
            [list]: arrayRemove(element)
        })

        //! Very important code 
        //! Re renders the whole component by unmounting and remounting it
        this.forceUpdate(this.componentDidMount())
        // console.log("executed delete button")
        // return (
        //     <View>
        //         <Snackbar
        //             visible={this.state.visible}
        //             onDismiss={() => this.setState({ visible: false })}
        //             duration={3000}
        //             action={{
        //                 label: 'Confirm',
        //                 onPress: async () => {
        //                     await updateDoc(textDataref, {
        //                         [list]: arrayRemove(element)
        //                     })
        //                 },
        //             }}>
        //           <Text>
        //              Do you want to delete {element}
        //             </Text> 
        //         </Snackbar>
        //     </View>
        // )
    }

    componentDidMount() {
        this.getListsFromFirebase()
        this.getAsyncStorageData()
    }


    render() {
        //! conditional rendering cause it takes time for tpa list to not be null since query has to go to firebase
        if (this.state.lists.tpa) {
        // * VARIABLES NAMES CANNOT CHANGE
        // *For 3 lists search function FILTERS out all names that do not match with the search query
            let { t, ins, o } = searchFunction(this.state.searchQuery, this.state.lists.tpa, this.state.lists.insuranceCompany, this.state.lists.otherCompany)

            return (
                <View style={{ flex: 1 }}>
                    {
                        this.renderModal()
                    }
                    <View style={{ margin: 30 }}>
                        <Searchbar
                            placeholder="Search"
                            onChangeText={this.onChangeSearch}
                            value={this.state.searchQuery}
                        />
                        {
                            //TODO Get logged in email and compare for doctors id
                            console.log("render affiliations", this.state.user)
                        }
                        {
                            this.state.user.emailId === "sahuexp@gmail.com" && (
                                <View style={styles.buttonContainer}>
                                    <Button
                                        icon={"pencil"}
                                        labelStyle={{ fontSize: 25 }}
                                        mode="contained"
                                        contentStyle={[styles.button, { width: width - 40, }]}
                                        style={styles.button}
                                        buttonColor='red'
                                        onPress={() => {
                                            this.setState({
                                                editing: !this.state.editing,
                                                modal: !this.state.modal
                                            })
                                            console.log("Affiliations edit data", this.state.editing)
                                        }}>
                                        <Text style={[styles.buttonText, { color: 'white' }]}>Edit Data</Text>
                                    </Button>
                                </View>
                            )
                        }
                    </View>
                    {/* //? Beneath commented code doesnt work because of different class rendering issues */}
                    {/* <ListComponent tpaList={t} otherCompanyList={ins} insuranceCompanyList={o}/>
                {console.log("Inside Render method",t)} */}




                    {/* //* Renders each list extracted */}
                    <ScrollView>
                        {t.map((element, index) => (
                            // console.log(element),
                            <ScrollView horizontal style={{ minWidth: width }}>
                                <List.Item
                                    title={element}
                                    key={index}
                                    titleStyle={{ textAlign: 'auto', marginRight: width }}
                                    style={{ borderBottomColor: 'black', borderBottomWidth: 1, }}
                                    left={() => {
                                        return this.state.editing === true && (
                                            <Ionicons name='trash' size={26} style={{marginLeft:10}} onPress={() => {
                                                //TODO Part of the snackbar left code
                                                // this.setState({
                                                //     visible: true
                                                // })

                                                this.removeElementFromFirestoreList("tpa", element)
                                            }} />
                                        )
                                    }} />

                            </ScrollView>

                        ))
                        }
                        {ins.map((element, index) => (
                            // console.log(element),
                            <ScrollView horizontal style={{ minWidth: width }}>
                                <List.Item
                                    title={element}
                                    key={index}
                                    titleStyle={{ textAlign: 'auto', marginRight: width }}
                                    style={{ borderBottomColor: 'black', borderBottomWidth: 1, }}
                                 left={() => {
                                        return this.state.editing === true && (
                                            <Ionicons name='trash' size={26} style={{marginLeft:10}} onPress={() => {
                                                //TODO Part of the snackbar left code
                                                // this.setState({
                                                //     visible: true
                                                // })

                                                this.removeElementFromFirestoreList("insuranceCompany", element)
                                            }} />
                                        )
                                    }} />

                            </ScrollView>

                        ))
                        }
                        {o.map((element, index) => (
                            // console.log(element),
                            <ScrollView horizontal style={{ minWidth: width }}>
                                <List.Item
                                    title={element}
                                    key={index}
                                    titleStyle={{ textAlign: 'auto', marginRight: width }}
                                    style={{ borderBottomColor: 'black', borderBottomWidth: 1, }}
                              left={() => {
                                        return this.state.editing === true && (
                                            <Ionicons name='trash' size={26} style={{marginLeft:10}} onPress={() => {
                                                //TODO Part of the snackbar left code
                                                // this.setState({
                                                //     visible: true
                                                // })

                                                this.removeElementFromFirestoreList("otherCompany", element)
                                            }} />
                                        )
                                    }} />

                            </ScrollView>

                        ))
                        }
                    </ScrollView>
                </View>
            );
        } else {
            return <ActivityIndicator />
        }
    }
}

const styles = StyleSheet.create({
    button: {
        width: width - 40,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textInput: {
        marginTop: Platform.OS === 'ios' ? 0 : 12,
        paddingLeft: 10,
        color: '#05375a',
        width: width / 1.3
    },
})

export default Affiliations;