import { useEffect } from "react";

const AdSense = () => {
    useEffect(() => {
      const script = document.createElement('script');
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      script.async = true;
      document.body.appendChild(script);
  
      return () => {
        document.body.removeChild(script);
      };
    }, []);
  
    return (
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-5129343811343231"
        data-ad-slot="9533467716"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    );
  };
  export default AdSense