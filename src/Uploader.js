import React from 'react'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import { Box, Stack, Meter, Text, Grommet} from 'grommet'
const Tesseract = window.Tesseract;

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
    files.map(file => {
      Tesseract.recognize(file)
      .progress(message => {
        this.setState({
          progDisplay: true,
          OCRStatus: message.status,
          OCRProgress: message.progress
        })
        
      })
      .then(res => {
        this.setState({ progDisplay: false })
        console.log(res)
        // const newRes = 
      })
      return null
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