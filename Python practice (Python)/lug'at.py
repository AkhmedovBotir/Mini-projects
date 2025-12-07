en_uz = {
    'apple':'olma',
    'banana':'banan',
    'book':'kitob',
    'pencil':'qalam',
    'dictionary':"lug'at",
    'cat':'mushuk',
    'dog':'it',
    'hello':'salom',
    'hi':'salom',
    'shake':'silkitmoq',
    'fake':"yolg'on",
    'number':'raqam',
    'new':'yangi',
    'office':'ofis',
    'speed':'tezlik',
    'if':'agar'

# faqat 'eng':'uz' ketma-ketlikda kiritishingiz mumkin
# hohlagancha kiritishingiz mumkin bu sizga bog'liq
# pastdagi cod esa baribir o'qiyveradi

    }
# o'zboshimchalik bilan o'zgartirmang mabodo o'zgarsa dastur ishlamay qoladi
dictionary = en_uz.get(input('Inglizcha so\'z kiriting:\n>>>>'), 'xato, bundan so\'z jadvalimizda yo\'q')
print(dictionary)
