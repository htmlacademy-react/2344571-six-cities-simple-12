import './loader.css';

function LoaderComponent(): JSX.Element {

  return (
    <div className="spinner">
      <div className="spinner__dot1"></div>
      <div className="spinner__dot2"></div>
    </div>
  );
}

export default LoaderComponent;
