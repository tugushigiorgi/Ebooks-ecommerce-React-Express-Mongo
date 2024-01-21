


import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { pdfjs } from 'react-pdf';
import {useEffect, useState} from "react";
import ApiService from "../../../Services/ApiService";
import {useParams} from "react-router";
const ReaderPage=()=>{
    const [pdfPath,setPath] = useState(" ")
    const {bookid} =useParams()


    useEffect(()=>{

        ApiService.getBookPdf(bookid)
            .then(response=>{




                if(response){

                    setPath(`${ApiService.apiBase}/`+response.data.filePath)
                }



            })
            .catch(error=>{

                console.log(error)
            })



    },[])



    return <div>

        <div style={{width: '100%', height: '100%'}}>
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}>


                <Viewer fileUrl={pdfPath}/>


            </Worker>
        </div>

    </div>
}

export default ReaderPage