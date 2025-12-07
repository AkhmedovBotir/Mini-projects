print("Kiritilgan sonni kvadratini qaytaruvchi while dastur")
savol = "Istalgan son kiriting:  "
savol += '(Dasturni to\'xtashi uchun exit deb yozing) '
qiymat = ''
while qiymat != 'exit':
    qiymat = input(savol)
    if qiymat != 'exit':
        print(float(qiymat)**2)
print("dastur tugadi")
