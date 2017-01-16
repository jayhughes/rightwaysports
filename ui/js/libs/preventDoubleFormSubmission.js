$.fn.preventDoubleSubmission = function() {
$(this).off('submit.preventDoubleSubmission').on('submit.preventDoubleSubmission',function(e){
    
    if (this.downloadFile) {
      this.downloadFile = false;
      return;
    }

    // if (this.submittedXX) {
    //   console.log('already submitted');
    //   e.stopPropagation();

    // } else {
    //   this.submittedXX = true;
    // }

    // Preventing Double Form Submission
    var $form = $(this);

    if ($form.data('submitted') === true) {
      // Previously submitted - don't submit again
      e.preventDefault();
    } else {
      // Mark it so that the next submit can be ignored
      $form.data('submitted', true);
    }

    });
    return this;
};

