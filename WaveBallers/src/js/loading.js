const loadingTime = () => {
    document.querySelectorAll('.progress , .indeterminate').forEach((loading) => {
      loading.style.marginTop = '50%'
      loading.style.marginBottom = '50%'
  
      setTimeout(() => {
      loading.style.marginTop = '0%'
      loading.style.marginBottom = '0%'
      loading.classList.remove('progress' , 'indeterminate')
      } , 1000)
    })
  }

  
export {loadingTime}