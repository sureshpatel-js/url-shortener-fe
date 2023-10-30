import Modal from "./modal/Modal";
import "./Links.css";
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import { useSelector } from "react-redux";
import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { base_url } from "../../../appConstants";
import axios from "axios";
import { NotificationManager } from "react-notifications"
import Button from "../../../components/button/Button";
const Links = (props) => {
    const user = useSelector(state => state.user);
    const gridRef = useRef(); // Optional - for accessing Grid's API
    const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
    const [toggleCreatLinkModal, setToggleCreatLinkModal] = useState(false);

    // Example load data from sever
    useEffect(() => {
        (async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(
                    `${base_url}link/getLinks?page=1`,
                    {
                        headers: {
                            token
                        }
                    }
                );
                console.log("=====SUCCESS=====>", res);
                const links = res?.data?.data?.links;
                setRowData(links);
            } catch (error) {
                NotificationManager.error(error?.response?.data?.data?.message, "Error", 4000);
            }
        })()
    }, []);

    // Each Column Definition results in one Column.
    const [columnDefs, setColumnDefs] = useState([
        { headerName: "Title", field: 'title', filter: true, width: 100 },
        { headerName: "Input url", field: 'input_url', filter: true, width: 100 },
        { headerName: "Short url", field: 'output_url', filter: true, width: 100 },
        { headerName: "Clicks", field: 'click_count', filter: true, width: 100 },
        { headerName: "Clicks", field: 'click_count', filter: true, width: 100 },
        { headerName: "Status", field: 'status', filter: true, width: 100 },
        { headerName: "Created Date", field: 'created_at', filter: true, width: 100 },
    ]);

    // DefaultColDef sets props common to all Columns
    const defaultColDef = useMemo(() => ({
        sortable: true,
    }));

    // Example of consuming Grid Event
    const cellClickedListener = useCallback(event => {
        console.log('cellClicked', event);
    }, []);



    // Example using Grid's API
    const buttonListener = useCallback(e => {
        gridRef.current.api.deselectAll();
    }, []);

    return (
        <div className="links" >
            {toggleCreatLinkModal && <Modal />}
            <div className="linksHeader" >
                <div className="createLinkBtnContainer" >
                    <Button
                        width={120}
                        height={28}
                        onClick={() => setToggleCreatLinkModal(true)}
                    >
                        <i class="bi bi-link-45deg"></i>
                        Create Link
                    </Button>
                </div>
            </div>
            <div className="ag-theme-alpine" style={{ width: "100%", height: 500 }}>
                <AgGridReact
                    headerHeight={28}
                    rowHeight={28}
                    ref={gridRef} // Ref for accessing Grid's API
                    rowData={rowData} // Row Data for Rows
                    columnDefs={columnDefs} // Column Defs for Columns
                    defaultColDef={defaultColDef} // Default Column Properties
                    animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                    rowSelection='multiple' // Options - allows click selection of rows
                // onCellClicked={cellClickedListener} // Optional - registering for Grid Event
                />
            </div>
        </div>
    )
}

export default Links;