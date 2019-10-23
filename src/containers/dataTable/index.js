import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteColum, modifieColum, addColumn, getStartingPageData } from '../../store/actions/dataTable'
import { Form, Modal } from 'react-bootstrap';
import GenericForme from './genericForm/genericform'
import NavBar from '../common/navbar/navbar'
import Footer from '../common/footer/footer'
import CategoriesNav from '../common/cleanNav/categoriesNav'
import './dataTable.css'

class DataTable extends Component {
    state = {
        selectedLigne: null,
        modifieLigne: null,
        searchResult: "",
        searchColumn: 0,
        filteredTable: [],
        showmodale: false,
        showAdd: false,
        modalTable: []
    }
    componentDidMount = () => {
        this.props.getStartingPageData()
    }
    renderRow = (rowData, i) => {
        let tableStructure = this.props.tableStructure
        return (
            <tr
                tabIndex={i}
            /*onClick={() => { this.handleSelect(i); this.actualSelect(el) }}*/>
                {
                    tableStructure.map((column) => {
                        return (
                            <td>
                                {rowData[column.column_name]}
                            </td>
                        )
                    })

                }
                <td>
                    <span>
                        <button
                            id="addRowButton"
                            onClick={this.handleShow}
                            className="btn btn-primary btn-xs dt-edit"
                            type="button">
                            <span>&#9998;</span>
                        </button>
                    </span>
                    <span>
                        <button
                            onClick={() => { this.props.deleteColum(i) }}
                            className="btn btn-danger btn-xs dt-delete"
                            type="button">
                            <span>&times;</span>
                        </button>
                    </span>
                </td>
            </tr>
        )
    }
    handleSelect = (i) => {
        this.setState({ selectedLigne: i })
    }
    actualSelect = (el) => {
        this.setState({ modifieLigne: this.props.data.indexOf(el) })
    }
    handleSearchSelect = (event) => {
        this.setState({ searchColumn: event.target.options[event.target.selectedIndex].value })
    }
    showResultLignes = () => {
        let tab = this.props.data.filter((el) => { return (el[this.state.searchColumn].includes(this.state.searchResult)) })
        this.setState({ filteredTable: tab })
    }
    handleSearch = (event) => {
        this.setState({ searchResult: event.target.value })
        setTimeout(this.showResultLignes, 300)
    }
    handleClose = () => {
        this.setState({ showmodale: false });
    }
    handleCloseAdd = () => {
        this.setState({ showAdd: false });
    }
    handleShow = () => {
        this.setState({ showmodale: true });
    }
    handleShowAdd = () => {
        this.setState({ showAdd: true });
    }
    handleModalChange = (index, value) => {
        let tab = this.state.modalTable
        tab[index] = value
        this.setState({ modalTable: tab })
    }
    handleModifie = (newdata) => {
        this.props.modifieColum(newdata.map(el => { return (el.value) }), this.state.modifieLigne)
        this.handleClose()
    }
    handleAdd = (newdata) => {
        this.props.addColumn(newdata.map(el => { return (el.value) }))
        this.handleCloseAdd()
    }
    render() {
        const { data, column, CategorieTab, menu, footer, tableStructure } = this.props


        let appDataAreReady = false
        let dataToDisplay = data
        if (tableStructure !== null) {
            appDataAreReady = true
            if (this.state.searchResult.length > 2) {
                dataToDisplay = data.filter((el) => {
                    return (el[this.state.searchColumn].toLowerCase().includes(this.state.searchResult.toLowerCase()))
                })
            }

        }

        return (
            <div>
                <NavBar data={menu} />
                <CategoriesNav data={CategorieTab} />
                {
                    !appDataAreReady ?
                        <center>
                            <img src="loading.gif"
                                style={{ height: "333px" }}
                                alt="effect of text revealing after scratching" />
                        </center> :
                        <React.Fragment>
                            <Modal show={this.state.showmodale} onHide={this.handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Modifie Ligne</Modal.Title>
                                </Modal.Header>
                                <Modal.Body id="modaleBody" >
                                    <GenericForme
                                        modifiefunction={this.handleModifie}
                                        data={column.map((el, i) => {
                                            return { ...el, value: data[this.state.modifieLigne || 0][i] }
                                        })}
                                    />
                                </Modal.Body>

                            </Modal>
                            <Modal show={this.state.showAdd} onHide={this.handleCloseAdd}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Modifie Ligne</Modal.Title>
                                </Modal.Header>
                                <Modal.Body id="modaleBody" >
                                    <GenericForme data={column} modifiefunction={this.handleAdd} />

                                </Modal.Body>

                            </Modal>
                            <br />
                            <div>
                                <Form>
                                    <Form.Row>
                                        <span>
                                            <Form.Label>serach bar : </Form.Label>
                                        </span>
                                        <span>
                                            <Form.Control onChange={(event) => { this.handleSearch(event); }} />
                                        </span>
                                        <span>
                                            <Form.Label>select witch colum : </Form.Label>
                                        </span>
                                        <span>
                                            <Form.Control as="select" onChange={(event) => { this.handleSearchSelect(event) }}>
                                                {
                                                    column.map((el, i) => {
                                                        return (<option value={i}>{el.label}</option>)
                                                    })
                                                }
                                            </Form.Control>
                                        </span>
                                    </Form.Row>
                                </Form>
                            </div>
                            <br />

                            <table width="100%" className="table table-striped table-bordered" id="example" cellSpacing={0}>
                                <thead>
                                    <tr>
                                        {tableStructure.map((el) => {
                                            return (<th>{el.column_name}</th>)
                                        })}
                                        <th>
                                            Add_new_row
                                        <button onClick={this.handleShowAdd}
                                                className="btn btn-success btn-xs dt-add"
                                                type="button"
                                                data-func="dt-add">
                                                +
                                        </button>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        dataToDisplay.map((el, i) => {
                                            return (
                                                this.renderRow(el, i)
                                            )
                                        })
                                    }
                                </tbody>
                            </table>

                            {/* Modal */}
                            <div className="modal fade" id="myModal" role="dialog">
                                <div className="modal-dialog">
                                    {/* Modal content*/}
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <button className="close" type="button" data-dismiss="modal">×</button>
                                            <h4 className="modal-title">Row information</h4>
                                        </div>
                                        <div className="modal-body">
                                        </div>
                                        <div className="modal-footer">
                                            <button className="btn btn-default" type="button" data-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </React.Fragment>
                }

                <Footer data={footer} />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        data: state.DataTableReducer.data,
        column: state.DataTableReducer.column,
        menu: state.menuReducers.menu,
        footer: state.FooterReducer.footer,
        CategorieTab: state.MegaMenuReducers.CategorieTab,
        tableStructure: state.DataTableReducer.tableStructure,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getStartingPageData: () => dispatch(getStartingPageData()),
        deleteColum: (index) => dispatch(deleteColum(index)),
        modifieColum: (newData, index) => dispatch(modifieColum(newData, index)),
        addColumn: (newdata) => dispatch(addColumn(newdata))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DataTable)
