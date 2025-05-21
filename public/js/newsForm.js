import CloudinaryUploadAdapterPlugin from '../../utils/cloudinaryUploadAdapter.js'
import { ClassicEditor, Indent, IndentBlock, BlockQuote } from 'ckeditor5';


document.addEventListener('DOMContentLoaded', () => {
    ClassicEditor
        .create(document.querySelector('#editor'), {
            extraPlugins: [CloudinaryUploadAdapterPlugin],
            toolbar: {
                items: [
                    'heading', '|',
                    'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|',
                    'imageUpload', 'blockQuote', 'insertTable', 'mediaEmbed', 'undo', 'redo'
                ]
            }
        })
        .then(editor => {
            window.editor = editor; // Lưu editor để validate
        })
        .catch(error => {
            console.error('CKEditor initialization error:', error);
        });

    document.querySelector('form').addEventListener('submit', (e) => {
        const content = window.editor.getData();
        if (!content) {
            e.preventDefault();
            alert('Content is required!');
        }
    });
});