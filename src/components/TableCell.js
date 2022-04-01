import { useState } from "react";

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
            <rux-table-row key={index} className={`status-row-${errorSeverity} ack-row-${onAck}`}>
                <rux-table-cell><rux-monitoring-icon icon="equipment" status={errorSeverity}></rux-monitoring-icon></rux-table-cell>
                <rux-table-cell>{errorMessage}</rux-table-cell>
                <rux-table-cell>{contactName}</rux-table-cell>
                <rux-table-cell>{humanTime}</rux-table-cell>
                <rux-table-cell>
                    <rux-button secondary="true" onClick={() => onDetail(contactSatellite, contactDetail)}>
                        <rux-icon icon="search" size="extra-small"></rux-icon>
                        Show Details
                    </rux-button>
                    <rux-button
                        className={`status-button-${errorSeverity} ack-button-${onAck}`} onClick={() => setOnAck((cls) => (cls === "none" ? "display" : "none"))}>
                        <rux-icon icon="done" size="extra-small"></rux-icon>
                        Acknowledge
                    </rux-button>
                </rux-table-cell>
            </rux-table-row>
        </>
    )
}