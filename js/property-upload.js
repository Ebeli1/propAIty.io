// Property Upload Functionality

let currentStep = 1;
const totalSteps = 4;
let uploadedPhotos = [];

document.addEventListener('DOMContentLoaded', function() {
    initializePropertyUpload();
});

function initializePropertyUpload() {
    // Initialize character counter for description
    const descriptionInput = document.getElementById('description');
    const charCount = document.getElementById('charCount');
    
    if (descriptionInput && charCount) {
        descriptionInput.addEventListener('input', function() {
            charCount.textContent = this.value.length;
        });
    }
    
    // Photo upload functionality
    const photoUploadArea = document.getElementById('photoUploadArea');
    const photoInput = document.getElementById('photoInput');
    
    if (photoUploadArea && photoInput) {
        // Click to upload
        photoUploadArea.addEventListener('click', function() {
            photoInput.click();
        });
        
        // Drag and drop
        photoUploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.style.backgroundColor = 'rgba(0, 102, 255, 0.1)';
        });
        
        photoUploadArea.addEventListener('dragleave', function() {
            this.style.backgroundColor = '';
        });
        
        photoUploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            this.style.backgroundColor = '';
            
            const files = e.dataTransfer.files;
            handlePhotoUpload(files);
        });
        
        // File input change
        photoInput.addEventListener('change', function() {
            handlePhotoUpload(this.files);
        });
    }
    
    // Navigation buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', goToPreviousStep);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', goToNextStep);
    }
    
    if (submitBtn) {
        submitBtn.addEventListener('click', handleFormSubmit);
    }
    
    // Update progress steps
    updateProgressSteps();
    
    // Initialize form validation
    initializeFormValidation();
}

function updateProgressSteps() {
    // Update step indicators
    document.getElementById('currentStep').textContent = currentStep;
    
    // Update progress bar
    document.querySelectorAll('.progress-steps .step').forEach((step, index) => {
        if (index + 1 === currentStep) {
            step.classList.add('active');
        } else if (index + 1 < currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
    
    // Update form steps visibility
    document.querySelectorAll('.form-step').forEach((step, index) => {
        if (index + 1 === currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
    
    // Update navigation buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    if (prevBtn) {
        prevBtn.disabled = currentStep === 1;
    }
    
    if (nextBtn && submitBtn) {
        if (currentStep === totalSteps) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-flex';
            updateReviewSummary();
        } else {
            nextBtn.style.display = 'inline-flex';
            submitBtn.style.display = 'none';
        }
    }
}

function goToPreviousStep() {
    if (currentStep > 1) {
        currentStep--;
        updateProgressSteps();
    }
}

function goToNextStep() {
    if (validateCurrentStep()) {
        if (currentStep < totalSteps) {
            currentStep++;
            updateProgressSteps();
        }
    }
}

function validateCurrentStep() {
    const currentStepElement = document.getElementById(`step${currentStep}`);
    
    if (!currentStepElement) return true;
    
    // Get all required inputs in current step
    const requiredInputs = currentStepElement.querySelectorAll('input[required], select[required], textarea[required]');
    
    for (let input of requiredInputs) {
        if (!input.value.trim()) {
            showError(input, 'This field is required');
            input.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return false;
        }
    }
    
    // Step-specific validations
    if (currentStep === 1) {
        const priceInput = document.getElementById('price');
        if (priceInput && parseFloat(priceInput.value) <= 0) {
            showError(priceInput, 'Please enter a valid price');
            return false;
        }
    }
    
    if (currentStep === 3) {
        if (uploadedPhotos.length === 0) {
            alert('Please upload at least one photo of the property');
            return false;
        }
    }
    
    return true;
}

function showError(input, message) {
    // Remove any existing error
    const existingError = input.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error styling
    input.classList.add('error');
    
    // Create error message
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.style.color = 'var(--danger-color)';
    errorElement.style.fontSize = '0.85rem';
    errorElement.style.marginTop = '5px';
    errorElement.textContent = message;
    
    input.parentNode.appendChild(errorElement);
    
    // Remove error on input
    input.addEventListener('input', function() {
        this.classList.remove('error');
        if (errorElement.parentNode === this.parentNode) {
            this.parentNode.removeChild(errorElement);
        }
    }, { once: true });
}

function initializeFormValidation() {
    // Add real-time validation for specific fields
    const priceInput = document.getElementById('price');
    if (priceInput) {
        priceInput.addEventListener('blur', function() {
            if (this.value && parseFloat(this.value) <= 0) {
                showError(this, 'Please enter a valid price');
            }
        });
    }
    
    const propertySizeInput = document.getElementById('propertySize');
    if (propertySizeInput) {
        propertySizeInput.addEventListener('blur', function() {
            if (this.value && parseFloat(this.value) <= 0) {
                showError(this, 'Please enter a valid property size');
            }
        });
    }
}

function handlePhotoUpload(files) {
    if (files.length + uploadedPhotos.length > 20) {
        alert('Maximum 20 photos allowed. Please remove some existing photos first.');
        return;
    }
    
    for (let file of files) {
        // Check file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            alert(`File ${file.name} is too large. Maximum size is 5MB.`);
            continue;
        }
        
        // Check file type
        if (!file.type.match('image/jpeg') && !file.type.match('image/png') && !file.type.match('image/jpg')) {
            alert(`File ${file.name} must be a JPG or PNG image.`);
            continue;
        }
        
        // Create preview
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadedPhotos.push({
                name: file.name,
                url: e.target.result,
                size: file.size
            });
            
            updatePhotoGallery();
        };
        reader.readAsDataURL(file);
    }
}

function updatePhotoGallery() {
    const uploadedPhotosContainer = document.getElementById('uploadedPhotos');
    if (!uploadedPhotosContainer) return;
    
    uploadedPhotosContainer.innerHTML = '';
    
    uploadedPhotos.forEach((photo, index) => {
        const photoItem = document.createElement('div');
        photoItem.className = 'photo-item';
        photoItem.innerHTML = `
            <img src="${photo.url}" alt="Property photo ${index + 1}">
            <button type="button" class="photo-remove" data-index="${index}">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        uploadedPhotosContainer.appendChild(photoItem);
    });
    
    // Add remove event listeners
    document.querySelectorAll('.photo-remove').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            uploadedPhotos.splice(index, 1);
            updatePhotoGallery();
        });
    });
}

function updateReviewSummary() {
    // Update basic information
    const basicInfo = {
        'Property Type': document.getElementById('propertyType')?.value || 'Not specified',
        'Transaction Type': document.getElementById('transactionType')?.value || 'Not specified',
        'Price': document.getElementById('price')?.value ? 
                 `${document.getElementById('currency')?.value || 'USD'} ${parseInt(document.getElementById('price').value).toLocaleString()}` : 
                 'Not specified',
        'Size': document.getElementById('propertySize')?.value ? 
                `${parseInt(document.getElementById('propertySize').value).toLocaleString()} sq ft` : 
                'Not specified',
        'Address': document.getElementById('address')?.value || 'Not specified',
        'City': document.getElementById('city')?.value || 'Not specified',
        'Country': document.getElementById('country')?.value || 'Not specified'
    };
    
    const basicContainer = document.getElementById('reviewBasic');
    if (basicContainer) {
        basicContainer.innerHTML = Object.entries(basicInfo)
            .map(([label, value]) => `
                <div class="review-item">
                    <span class="review-label">${label}:</span>
                    <span class="review-value">${value}</span>
                </div>
            `).join('');
    }
    
    // Update property details
    const detailsInfo = {
        'Title': document.getElementById('title')?.value?.substring(0, 50) + '...' || 'Not specified',
        'Bedrooms': document.getElementById('bedrooms')?.value || 'Not specified',
        'Bathrooms': document.getElementById('bathrooms')?.value || 'Not specified',
        'Year Built': document.getElementById('yearBuilt')?.value || 'Not specified',
        'Parking': document.getElementById('parking')?.value || 'Not specified'
    };
    
    const detailsContainer = document.getElementById('reviewDetails');
    if (detailsContainer) {
        detailsContainer.innerHTML = Object.entries(detailsInfo)
            .map(([label, value]) => `
                <div class="review-item">
                    <span class="review-label">${label}:</span>
                    <span class="review-value">${value}</span>
                </div>
            `).join('');
    }
    
    // Update photos info
    const photosContainer = document.getElementById('reviewPhotos');
    if (photosContainer) {
        photosContainer.innerHTML = `
            <div class="review-item">
                <span class="review-label">Photos Uploaded:</span>
                <span class="review-value">${uploadedPhotos.length}</span>
            </div>
            <div class="review-item">
                <span class="review-label">Main Photo:</span>
                <span class="review-value">${uploadedPhotos[0]?.name || 'None'}</span>
            </div>
        `;
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    if (!validateCurrentStep()) {
        return;
    }
    
    // Check terms agreement
    const termsAgreement = document.getElementById('termsAgreement');
    if (!termsAgreement?.checked) {
        alert('Please agree to the listing terms and privacy policy.');
        return;
    }
    
    // Collect form data
    const formData = new FormData(document.getElementById('propertyUploadForm'));
    const propertyData = {};
    
    // Convert FormData to object
    for (let [key, value] of formData.entries()) {
        if (key === 'amenities') {
            if (!propertyData.amenities) propertyData.amenities = [];
            propertyData.amenities.push(value);
        } else {
            propertyData[key] = value;
        }
    }
    
    // Add photos
    propertyData.photos = uploadedPhotos;
    
    // Add timestamp
    propertyData.submittedAt = new Date().toISOString();
    
    // Generate property ID
    propertyData.id = 'PROP-' + Date.now();
    
    console.log('Property data submitted:', propertyData);
    
    // Show loading state
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Store in localStorage (for demo)
            const existingProperties = JSON.parse(localStorage.getItem('propAIty_properties') || '[]');
            existingProperties.push(propertyData);
            localStorage.setItem('propAIty_properties', JSON.stringify(existingProperties));
            
            // Show success modal
            showSuccessModal();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }
}

function showSuccessModal() {
    const modal = document.getElementById('successModal');
    const closeBtn = document.getElementById('closeSuccessModal');
    
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
            
            // Reset form and redirect
            setTimeout(() => {
                document.getElementById('propertyUploadForm').reset();
                uploadedPhotos = [];
                updatePhotoGallery();
                currentStep = 1;
                updateProgressSteps();
                window.location.href = 'dashboard-coming-soon.html';
            }, 500);
        });
    }
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
            
            // Reset form and redirect
            setTimeout(() => {
                document.getElementById('propertyUploadForm').reset();
                uploadedPhotos = [];
                updatePhotoGallery();
                currentStep = 1;
                updateProgressSteps();
                window.location.href = 'dashboard-coming-soon.html';
            }, 500);
        }
    });
}

// Add field error styles to main.css if not present
if (!document.querySelector('#field-error-styles')) {
    const style = document.createElement('style');
    style.id = 'field-error-styles';
    style.textContent = `
        .form-input.error {
            border-color: var(--danger-color) !important;
            background-color: rgba(239, 68, 68, 0.05) !important;
        }
        
        .field-error {
            color: var(--danger-color) !important;
            font-size: 0.85rem !important;
            margin-top: 5px !important;
        }
    `;
    document.head.appendChild(style);
}