var PurpleMine = PurpleMine || {} // eslint-disable-line no-use-before-define

PurpleMine.AttachmentCollapse = (function () {
  'use strict'

  var instance
  var translations = {
    en: {
      attachmentToggler: 'Expand/collapse attachments'
    },
    ro: {
      attachmentToggler: 'Expand/collapse top menu'
    },
    fr: {
      attachmentToggler: 'Élargir/réduire les pièces jointes'
    },
    pl: {
      attachmentToggler: 'Expand/collapse top menu'
    },
    de: {
      attachmentToggler: 'Anhänge aufklappen/zusammenklappen'
    },
    ja: {
      attachmentToggler: '添付ファイルの展開/折りたたみ'
    }
  }

  function AttachmentCollapse () {
    if (instance) {
      return instance
    }

    instance = this

    this.lang = document.documentElement.lang

    if (typeof translations[this.lang] === 'undefined') {
      this.lang = 'en'
    }

    this._ = translations[this.lang]

    var issueContainer = $('body.controller-issues');
    
    if(issueContainer === null || !issueContainer.length){
      return;
    }

    this.attachment = issueContainer.find('.attachments');
    handleAttachments(this.attachment);
  }

  function handleAttachments (attachment) {
    buildToggleButton(attachment)
    instance.collapse()
  }

  function buildToggleButton (attachment) {
    var buttonLabel = instance._['attachmentToggler'];

    var buttonHTML= '<input type="button" class="attachment-toggler"' +
      '" value="' +
      buttonLabel+
      '"></a>'

    instance.$toggler = $(buttonHTML)

    attachment.before(instance.$toggler);
    attachment.before('<br /><br />');
    instance.$toggler.on('click', instance.toggl)
  }

  AttachmentCollapse.prototype.toggl = function (event) {
    if (instance.isCollapsed(instance.attachment)) {
      instance.expand(instance.attachment)
    } else {
      instance.collapse(instance.attachment)
    }
  }

  AttachmentCollapse.prototype.isCollapsed = function() {
    return this.attachment.collapsed
  }

  AttachmentCollapse.prototype.expand = function () {
    this.attachment.collapsed = false;
    $(this.attachment).show();
  }

  AttachmentCollapse.prototype.collapse = function () {
    this.attachment.collapsed = true;
    $(this.attachment).hide();
  }

  return AttachmentCollapse
}())
