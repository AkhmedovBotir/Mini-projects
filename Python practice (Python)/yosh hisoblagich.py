a = input("Ismingiz:  ")
b = int(input("Tug'ilgan yilingiz:  "))
c = int(input("Hozirda qaysi yil:  "))
def ismfam(ism, hozirgiyil, tugilganyil,):
    """Foydalanuvchidan sorash"""
    print('______________________________________\n'
          f"Hurmatli {ism.title()}\n"
          f"Hozir {c}-yil, siz esa {hozirgiyil-tugilganyil} yoshdasiz")
ismfam(a, c, b)
