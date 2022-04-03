import { useState, useEffect } from "react";
import { RuxTable, RuxTableBody } from "@astrouxds/react";
import { TableHeader } from './TableHeader';
import { TableCell } from './TableCell';
import { Modal } from './Modal';

export default function Table(rows) {
    const [newRows, setNewRows] = useState([]);
    const [filteredRows, setFilteredRows] = useState([]);
    const [severityInput, setSeverityInput] = useState('');

    useEffect(() => {
        setNewRows(rows.data);
    }, [rows.data])


    /* 
        view alerts by their severity as well 
        so that they can prioritize acknowledging the more severe alerts first.
        Please go to references: viewSeverity, setViewSeverity, onSeverity
    */
    const searchSeverity = (value) => {
        setSeverityInput(value);
        if (value !== 'all') {
            const filteredData = newRows.filter((row) => {
                return row.alerts[0].errorSeverity === value;
            })
            setFilteredRows(filteredData);
        } else {
            setFilteredRows(newRows);
        }
    }

    /* 
        By clicking on the button called Show Details, it utilizes RuxModal to show the detail. 
        Please go to references: RuxModal, detail, setDetail, onDetail, contactSatellite, contactDetail  
    */
    const [detail, setDetail] = useState({
        isOpen: false,
        modalTitle: '',
        modalMessage: ''
    });

    return (
        <>
            <RuxTable>
                <TableHeader onSeverity={(value) => searchSeverity(value)} />
                <RuxTableBody>
                    {severityInput ? (
                        filteredRows.map((contact, index) => {
                            return (
                                <TableCell
                                    data={contact}
                                    key={index}
                                    onDetail={(...previous) => setDetail({ isOpen: true, modalTitle: previous[0], modalMessage: previous[1] })}
                                />
                            )
                        })
                    ) : (
                        newRows.map((contact, index) => {
                            return (
                                <TableCell
                                    data={contact}
                                    key={index}
                                    onDetail={(...previous) => setDetail({ isOpen: true, modalTitle: previous[0], modalMessage: previous[1] })}
                                />
                            )
                        })
                    )}
                </RuxTableBody>
            </RuxTable>
            <Modal data={detail} />
        </>
    )
}
