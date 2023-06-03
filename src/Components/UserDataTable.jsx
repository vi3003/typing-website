import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import { useTheme } from "../Context/ThemeContext";

const UserDataTable = ({ data }) => {
    
    const {theme} = useTheme();
    const styles = {color: theme.textColor, textAlign: 'center'}

    return (
      <div className="table">
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={{color: theme.typeBoxText, textAlign: 'center'}}>
                            WPM
                        </TableCell>
                        <TableCell style={{color: theme.typeBoxText, textAlign: 'center'}}>
                            Accuracy
                        </TableCell>
                        <TableCell style={{color: theme.typeBoxText, textAlign: 'center'}}>
                            Characters
                        </TableCell>
                        <TableCell style={{color: theme.typeBoxText, textAlign: 'center'}}>
                            Date
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data.map((i)=>(
                            <TableRow>
                                <TableCell style={styles}>{i.wpm}</TableCell>
                                <TableCell style={styles}>{i.accuracy}</TableCell>
                                <TableCell style={styles}>{i.Character}</TableCell>
                                <TableCell style={styles}>{i.timeStamp.toDate().toLocaleString()}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
      </div>
    )
}

export default UserDataTable;