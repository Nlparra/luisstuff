import { useState } from "react";
import { RuxTableRow, RuxTableCell, RuxButton, RuxMonitoringIcon } from "@astrouxds/react";

export const TableCell = ({ data: { index, _id, contactName, contactDetail, contactSatellite, contactBeginTimestamp, contactEndTimestamp, alerts }, onDetail }) => {

    /* Self explanatory */
    const convertEpochToHumanReadable = (time) => {
        let minutes = '';
        let seconds = '';
        let newTime;
        if (time < 3600) {
            minutes = Math.floor(time / 60);
            seconds = '00';
            newTime = `00:${minutes}:${seconds}`;
            return newTime;
        }
    };

    const epochTime = contactEndTimestamp - contactBeginTimestamp;
    const humanTime = convertEpochToHumanReadable(epochTime);

    const errorMessage = alerts[0].errorMessage;
    const errorSeverity = alerts[0].errorSeverity;

    /*
        When they click 'Acknowledge' button, we call setOnAck with a new value. onAck will add the new value to ack-button-${onAck} and ack-row-${onAck}. 
        The target acknowledge button will be disappear, and the target row's background color will be change. 

        If they want to eliminate the target row by clicking the Acknowledge button, use setRows for it. Please go to reference: setRows
    */
    const [onAck, setOnAck] = useState("");

    return (
        <>
            <RuxTableRow key={index} className={`status-row-${errorSeverity} ack-row-${onAck}`}>
                <RuxTableCell><RuxMonitoringIcon icon="equipment" status={errorSeverity}></RuxMonitoringIcon></RuxTableCell>
                <RuxTableCell>{errorMessage}</RuxTableCell>
                <RuxTableCell>{contactName}</RuxTableCell>
                <RuxTableCell>{humanTime}</RuxTableCell>
                <RuxTableCell>
                    <RuxButton secondary="true" onClick={() => onDetail(contactSatellite, contactDetail)}>
                        <rux-icon icon="search" size="extra-small"></rux-icon>
                        Show Details
                    </RuxButton>
                    <RuxButton
                        className={`status-button-${errorSeverity} ack-button-${onAck}`} onClick={() => setOnAck((cls) => (cls === "none" ? "display" : "none"))}>
                        <rux-icon icon="done" size="extra-small"></rux-icon>
                        Acknowledge
                    </RuxButton>
                </RuxTableCell>
            </RuxTableRow>
        </>
    )
}