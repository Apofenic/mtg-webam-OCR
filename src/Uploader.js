import React from 'react'
import Dropzone from 'react-dropzone'
import { Box, Grommet} from 'grommet'
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
class Uploader extends React.Component {

  state = {
    disabled: true,
    files: []
  }

  onDrop = (files) => {
    this.setState({files});
  }

  toggleDisabled= () =>  {
    this.setState({
      disabled: !this.state.disabled
    })
  }

  render() {
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
        <div className="dropzone">
          <Dropzone
            onDrop={this.onDrop.bind(this)}
          >
            {({getRootProps, getInputProps}) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                 <h1>Drop files here, or click to select files</h1>
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