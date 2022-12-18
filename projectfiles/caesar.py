import string
letters, ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZ", ""


def decode_char(ch, shift):
    """ returns the shifted decoding of a character and will return the 
    plaintext character that pertains to the shift, otherwise the character 
    is returned and not decoded """

    mark = False

    for c in letters:
            if ch.upper() == c:
                    mark = True
    if not mark:
            return ch

    ind = letters.index(ch.upper())
    result = (ind + shift + len(letters)) % len(letters)
    return letters[result]



def get_shift(s, ignore, letter):
    """ shift (decode key) is returned for string s and the most common 
    letter, the ignore parameter is the string of letters to be ignored 
    (they may have been tried but do not result in readable English text) """
    
    s = sorted(s)
    char, last_ch = s[0], s[0]
    i = 1
    count, max_count, initial = 0, 0, 0

    while i < len(s):

            if (s[i] == " ") or (s[i] in ignore) or (s[i].upper() not in letters):
                    i += 1
                    continue

            main_ch = s[i]
            common = s.count(main_ch)

            if common > initial:
                initial = common

            if last_ch == main_ch:
                    count += 1
            else:
                    count = 1
                    last_ch = main_ch

            if max_count < count:
                    max_count = count
                    char = main_ch
            i += 1
            
    return (letters.index(letter) - letters.index(char.upper()), char)



def output_plaintext(s,shift):
    """ decode key is used to determine the outputted plaintext, this is done 
    character by character """

    decoded = ""
    
    for i in s:
        decoded += str(decode_char(i, shift))

    return ("\n{}").format(decoded).upper()



def main():
    print("\n")
    s = (input("Input ciphertext: "))
    ignore = ""
    letter = (input("\nInput frequent letter for decryption: "))

    if letter.islower():
        letter = letter.upper()
    else:
        letter = letter

    while s != False:
        shift = get_shift(s, ignore, letter)
        decoded = output_plaintext(s, shift[0])
        print(decoded)
        readable = input("\nIs the plaintext readable as English? (y/n): ").lower()

        if readable != "n":
            print("\nDone.")
            break 
        else:
            ignore += shift[1]


if __name__ == "__main__": 
        main()