import React from 'react'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import { Box, Stack, Meter, Text, Grommet} from 'grommet'

const Tesseract = window.Tesseract;

/*
this RegExp has the following pattern matches( from first to last): 
  - 2 or more consecutive white spaces
  - 2 or more consecutive uppercase characters
  - any special character 
  - any single character between 2 white spaces
*/
const ocrRegEx = /[\s]{2,}|[A-Z]{2,}|[^\w \xC0-\xFF]|\b[a-zA-Z0-9_]{1}\b/g
const filterRX = /[0-9\s]*/g
const theme = {
  global: {
   colors: {
    brand: '#228BE6',
  },
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
};

const ProgMeter = ({status, progress}) => {
  const val = progress ? progress : 0
  const percent = parseInt((val*100).toFixed(0)) 
  return(
    <Box  align="center" pad="large">
      <Stack anchor="center">
        <Meter
          type="circle"
          background="light-2"
          values={[{ value: percent }]}
          size="xsmall"
          thickness="small"
        />
        <Box direction="row" align="center" pad={{ bottom: "xsmall" }}>
          <Text size="xlarge" weight="bold">
            {percent}
          </Text>
          <Text size="small">%</Text>
        </Box>
      </Stack>
      <Text>{status}</Text>
    </Box>
  )
}

class Uploader extends React.Component {

  state = {
    disabled: true,
    progDisplay: false,
    OCRStatus: null,
    OCRProgress: null,
    files: []
  }

  onDrop = (files) => {
    return files.map(file => {
      return Tesseract.recognize(file)
      .progress(message => {
        this.setState({
          progDisplay: true,
          OCRStatus: message.status,
          OCRProgress: message.progress
        })
        
      })
      .then(res => {
        this.setState({ progDisplay: false })
        const specFilter = res.lines.map(line => 
          line.text.replace(ocrRegEx, '')
        )
        .map(str => str.replace(ocrRegEx, ''))
        .filter(x => x)
        console.log({specFilter})
        
        // const singleFilter = specFilter.map(newLine => {
        //   return newLine.replace(sglCharRegEx, match => {
        //     if(match !== "A" || match !== "I" || match !== "a") {
        //       return ""
        //     }
        //     console.log(match)
        //     return match
        //   })
        // }).filter(n => n)
        // console.log({singleFilter})
        return specFilter  
      })
    }) 
  }

  // toggleDisabled = () =>  {
  //   this.setState({
  //     disabled: !this.state.disabled
  //   })
  // }

  render() {
    const { OCRProgress, OCRStatus, progDisplay } = this.state
    const files = this.state.files.map(file => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
      </li>
    ))

    return (
      <Grommet theme={theme} full>
      <Box fill
        align='center'
        justify='center'
        pad={{ left: 'medium', right: 'small', vertical: 'small' }}
        elevation='medium'
        style={{ zIndex: '1' }}>
        {
          progDisplay &&  
          <ProgMeter
            status={OCRStatus}
            progress={OCRProgress}
          />
        }
        <div className="dropzone">
          <Dropzone
            onDrop={this.onDrop.bind(this)}
          >
            {({getRootProps, getInputProps}) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                 <h2>Drop files here, or click to select files</h2>
              </div>
            )}
          </Dropzone>
        </div>
        <aside>
          <h4>Files</h4>
          <ul>{files}</ul>
        </aside>
      </Box>
      </Grommet> 
    );
  }
}
export default Uploader