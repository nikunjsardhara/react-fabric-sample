import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import './App.css';
import 'fabric-webpack'
const fabric = window.fabric;

function App() {  
const [canvas, setCanvas] = useState({});
const [objects, setObjects] = useState(0);

useEffect(() => {
  setCanvas(new fabric.Canvas('c'));

}, []);

function removeObj(){
  if(canvas.getActiveObject()){
    canvas.getActiveObject().remove();
    setObjects(objects - 1);
  }
}

function handleFileUpload(event){
  event.persist();
  var reader = new FileReader();
  reader.onload = function (e){
    var imgObj = new Image();
    imgObj.src = e.target.result;
    imgObj.onload = function () {
      var image = new fabric.Image(imgObj);
      image.set({
            angle: 0,
            height:700,
            width:700,
      });
      canvas.centerObject(image);
      canvas.add(image);
      setObjects(objects + 1);
      canvas.renderAll();
    }
  }
  reader.readAsDataURL(event.target.files[0]);
}

function download(e){
  e.persist();
  canvas.deactivateAll().renderAll();
  e.target.href = canvas.toDataURL();
  e.target.download = "exported.png";
}

function addText(){
  var text = new fabric.IText('Add Text Here', {
    left: 50,
    top: 50,
    fontFamily: 'Helvetica',
    fill: '#333',
    lineHeight: 1.1,
  });
  canvas.add(text);
  setObjects(objects + 1);
}

  return (
    <div className="App">
      <header className="App-header">
        <input type="file" name="image-upload" onChange={handleFileUpload}/>
        {
          objects > 0 && (
            <Button variant="contained" style={{marginRight:'10px'}} onClick={removeObj}>Remove Selected</Button>
          )
        }
        <Button variant="contained" style={{marginRight:'10px'}} onClick={addText}>Add Text</Button>
        {
          objects > 0 && (
            <a className="MuiButtonBase-root MuiButton-root MuiButton-contained" href="#" variant="contained" style={{marginRight:'10px'}} onClick={download}>Download Image</a>
          )
        }
      </header>
      <div className="canvasContainer">
        <canvas id="c" width="700" height="700"></canvas>
      </div>
    </div>
  );
}

export default App;
