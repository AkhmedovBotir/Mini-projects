ism = input("Ismingiz")
if ism <= "":
    print("Ismingizni yozing")
else:
    yosh = int(input("yoshingiz"))
    if yosh <= 18:
        print("kichkinasiz")
    else:
        andijon = input("yashash joyingiz Andijonmi")
        if andijon.lower() > "ha":
            print("Bu joy faqat Andijonliklar uchun")
        else:
            qayeri = input("Andijonni qayeridansiz")
            if qayeri.lower() != "":
                malum = input("bizda siz haqingizda ma'lumot bor, ko'rmoqchimisiz?")
                if malum.lower() != "yo'q":
                    print(f"Ismingiz {ism.title()}, yoshingiz {yosh}, hozirda Andijonning {qayeri.title()}da yashaysiz")
            else:
                print("qayta tahrirlang")
